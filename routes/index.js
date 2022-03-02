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
                    {id:user[0]._id,
                    email:user[0].email,
                    accountNumber:user[0].accountNumber, 
                    role:user[0].role, 
                    fullname:user[0].fullname
                },
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
                 let JWT = jwt.sign({id:user[0]._id, email:user[0].email, accountNumber:user[0].accountNumber, role:user[0].role, fullname:user[0].fullname}, process.env.ACCESS_TOKEN_SECRET);
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
   let confirmationToken =require('crypto').randomBytes(24).toString('hex');
   let accountNumber = baseAccountNumber + add
   const confirmationURL = baseURL+"?token="+confirmationToken+accountNumber

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

       //send email
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
               username: (req.body.fullname).charAt(0).toUpperCase() +(req.body.fullname).slice(1),
                accountNumber: accountNumber

           },
       }],
       
       }
       sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
              return res.status(201).json("success")
              res.json({status:"done"})
            })
            .catch((error) => {
                //res.status(500).send()
              console.error(error)
            })

      
   } catch (e) {
       return res.status(400).json({message:e.message})   
   }

   })

   router.get('/confirm', async (req,res)=>{
       try {

        const user = await User.find({confirmationToken:req.query.token})
        let currentUser = user[0]
        console.log(currentUser)
        if(currentUser == null){
            return res.sendStatus(404)
        }else{
            //return res.json(currentUser)
            currentUser.confirmed = true;

            try {
                const updatedUser = currentUser.save()
            } catch (error) {
                return res.status(500).json({message:error})
            }
        }

       
       } catch (error) {
           return res.sendStatus(500)
       }


   })




 module.exports = router;