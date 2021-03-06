if(process.env.NODE_ENV !=="production"){
    require('dotenv').config({ path: '.env' });
}
const express = require("express");
const jwt = require("jsonwebtoken")
const transaction = require("../models/transaction");
const user = require("../models/user");
const router = express.Router(); 


router.post('/',Autherize,async (req,res)=>{
   // console.log(req.user._id, req.user.accountNumber, req.user.email ,{req:req.receipient})
    const sender = await user.findById(req.user._id)
    if( req.receipient === req.user.accountNumber||req.receipient === req.user.email)return res.status(400).json({message:"you can't be the receipient"})
        try {
if(req.isemail){
    try {
        const receipient = await user.findOne({email:req.receipient})
        if(receipient == null)res.sendStatus(404)
            if(sender.Balance < req.body.amount) return res.status(400).json({message:"invalid amount"})
            //sender.Balance = 100000;
            receipient.Balance += req.body.amount;
          const  newSender = await sender.save()
         const   newReceipient = await receipient.save()
         const NewTransac =await new transaction({
            senderAccountNumber: sender.accountNumber,
              senderName: sender.fullname,
              recipientAccountNumber: receipient.accountNumber,
              recipientName: receipient.fullname,
              Amount: req.body.amount,    
        }); try {
          await  NewTransac.save()
        res.status(200).json(NewTransac)
        } catch (error) {
            res.status(500).json(error)
        }
    } catch (error) {res.sendStatus(500)}
} 
} catch (error) {}
})



/*----------------- middleware user permission ----------------*/
function Autherize(req,res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){  console.log('stuch step 3'); return res.sendStatus(401)}
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err){return res.sendStatus(403)}
        req.user = user.user;
        req.params.id = req.params.id;
        req.receipient = req.body.receipient
        req.isemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.receipient);
        next();
    })
}


module.exports = router;