const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt= require("jsonwebtoken");
const baseAccountNumber = 187600000000;
const router = express.Router(); 
router.get('/', (req,res)=>{
    res.render("index")
})


//post login 1 big headed user
router.post('/login', async (req,res)=>{
    const isemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.identifier);
        if(isemail){
         const user = await User.find({email:req.body.identifier})
         try {
            if(await bcrypt.compare(req.body.password, user[0].password)){
                let JWT = jwt.sign(
                    {user:user[0]},
                process.env.ACCESS_TOKEN_SECRET);
                return  res.status(200).json([JWT, user[0]])
            }
            else{
                return res.status(400).send({message:"incorrect password"})
            }
           } catch (e) {
               return res.status(500).send({message:""})
           }
        } else{
         const user = await User.find({ accountNumber:req.body.identifier})
         try  {
            if(await bcrypt.compare(req.body.password, user[0].password)){
                 let JWT = jwt.sign({user:user[0]}, process.env.ACCESS_TOKEN_SECRET);
              return  res.status(200).json([JWT, user[0]])
            }
            else{
                return res.status(400).send({message:"incorrect password"})
            }
           } catch (e) {
               return res.status(501).send({message:e})
           }
        }        
 })


 //regester
router.post('/register', async(req,res)=>{


   let add = await (await User.find()).length;
   let baseURL = "http://localhost:1876/confirm"
   email = req.body.email;
   fullname = req.body.fullname;
   let accountNumber = baseAccountNumber + add
   let confirmationToken =require('crypto').randomBytes(24).toString('hex')+accountNumber;
   const confirmationURL = baseURL+"?token="+confirmationToken

   let accoutString = '********';
   let splitAccountNumber = accountNumber.toString().split('')
   for (let i = 8; i < splitAccountNumber.length; i++) {
       accoutString += splitAccountNumber[i];
        }
 
   const newYouser =  await new User({
   fullname,
   email, //require('crypto').randomBytes(10).toString('hex')+"@mail.test",
   password: await bcrypt.hash(req.body.password,10),
   Balance:0.0,
   confirmationToken,
   accountNumber,

   })
   try {
       const createduser = await newYouser.save()

       // email 
       let recipient = email;
       const confirmUrl =confirmationURL
       const sgMail = require('@sendgrid/mail')
       sgMail.setApiKey(process.env.SENDGRID_API_KEY)
       const msg = {
         to: recipient, // Change to your recipient
         from: process.env.EMAIL, // Change to your verified sender
         template_id: process.env.CONFIRM_ACCOUNT_TEMPLATE,//your trmplate id
       personalizations: [{
           to: { email: recipient },
           dynamic_template_data: {
               confirmUrl: confirmUrl,
               resetUrl:'',
               username: (req.body.fullname).charAt(0).toUpperCase() +(req.body.fullname).slice(1),
                accountNumber: accoutString

           },
       }],
       
       }
       sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
              return res.status(201).json("success")
            })
            .catch((error) => { return res.sendStatus(500)})
   } catch (e) {return res.status(400).json({message:e.message})}
   })

   router.get('/confirm', async (req,res)=>{
       try {

        const user = await User.find({confirmationToken:req.query.token})
        let currentUser = user[0]
        if(currentUser == null){
            return res.sendStatus(404)
        }else{
            
            currentUser.confirmed = true;
            currentUser.role ='authenticated'
            currentUser.confirmationToken = 'nan'


            try {
                const updatedUser = await currentUser.save()
                return res.redirect('/success')
            } catch (error) {
                return res.status(500).json({message:error})
            }
        }
       } catch (error) { return res.sendStatus(500)}


   })




 module.exports = router;