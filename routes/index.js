const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt= require("jsonwebtoken");
const baseAccountNumber = 187600000000;
const router = express.Router(); 

router.get('/', async (req,res)=>{
    const url = await page.url();
console.log(url);
    res.render("index")
})



//post login 1 big headed user
router.post('/login', async (req,res)=>{
    if(req.body.identifier == (null || undefined) || req.body.password == (null || undefined)) return res.status(400)
        if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.identifier)){
         const user = await User.find({email:req.body.identifier})
         console.log(user[0])
         if(user[0] == (null || undefined))return res.sendStatus(404)
         if(!user[0].confirmed ||user[0].blocked )return res.sendStatus(401)
         try {
            if(await bcrypt.compare(req.body.password, user[0].password) == false)return res.status(400).json("incorrect password")
                let JWT = await jwt.sign({user:user[0]},process.env.ACCESS_TOKEN_SECRET); console.log(`${user[0].fullname} successfully login`)
                return  res.status(200).json([JWT, user[0]])
           
           } catch (e) {return res.status(500).send({message:""})}
        } else{
    const user = await User.find({ accountNumber:req.body.identifier})

         if(user[0] == (null || undefined))return res.sendStatus(404)
         if(!user[0].confirmed||user[0].blocked)return res.sendStatus(401)
         try {
            if(await bcrypt.compare(req.body.password, user[0].password) == false)return res.status(400).json("incorrect password")
                let JWT = await jwt.sign({user:user[0]},process.env.ACCESS_TOKEN_SECRET);console.log(`${user[0].fullname} successfully login`)
                return res.status(200).json([JWT, user[0]])
           
           } catch (e) {return res.status(500).send({message:""})}
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
            }}]}
       sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
              return res.status(201).json("success")
            })
            .catch((error) => { return res.sendStatus(500)})
   } catch (e) {return res.status(400).json({message:e.message})}
   })

   //confirm
   router.get('/confirm', async (req,res)=>{
       try {

        const user = await User.find({confirmationToken:req.query.token})
        let currentUser = user[0]
        if(currentUser == null) return res.sendStatus(404)
            currentUser.confirmed = true;
            currentUser.role ='authenticated'
            currentUser.confirmationToken = 'nan'
            try {
                const updatedUser = await currentUser.save()
                return res.redirect('/success')
                } catch (error) {return res.status(500).json({message:error})}
       } catch (error) { return res.sendStatus(500)}


   })




 module.exports = router;