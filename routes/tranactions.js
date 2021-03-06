if(process.env.NODE_ENV !=="production"){
    require('dotenv').config({ path: '.env' });
}
const jwt = require("jsonwebtoken")
const express = require("express");
const transaction = require("../models/transaction");
const user = require("../models/user");
const router = express.Router(); 

//getall
router.get('/',  async(req,res)=>{
   
    const  transactions = await transaction.find();
    return res.status(200).json(transactions)
 })
//create one
 router.post('/', Autherize, async(req,res)=>{
    const  Transaction = await new transaction({
          senderAccountNumber: 187600000000,
          senderName: "Chester Johnson",
          recipientAccountNumber: 187600000002,
          recipientName:"Alex Griffiths",
          Amount: 1589.67
    });
    try {
        const newTransaction = await Transaction.save()
        return res.status(201).json("success")
    } catch (e) {
        return res.status(400).json({message:e.message})
        
    }
 })

//find one
 router.get('/:id',Autherize,getTransaction,  async(req,res)=>{
    
        return res.status(200).json(req.transaction)
 })
 
 //update one
 router.post('/:id', Autherize, getTransaction,async(req,res)=>{
    const  transactions = await transaction.find();
 })

 router.delete('/',async (req,res)=>{
    try {
        // await res.user.remove();
            await transaction.deleteMany()
    //return res.send("deleted")
        return res.status(204).json("user deleted")
    } catch (error) {
        return res.status(500).json({message:e.message})
    }
    
 })

 router.delete('/:id',Autherize,getTransaction, (req,res)=>{

 })


 /*-----------------middleware get user by id-------------------*/
 async  function getTransaction(req, res, next){
    let Transaction;
try {
   Transaction = await transaction.findById(req.params.id)
  if(user == null)return res.status(404).json({message:"Transaction was not found"})
} catch (e) {return res.status(500).json({message:e.message})}
req.transaction = Transaction;
next();
  }
/*----------------- end of middleware get user by id ----------------*/



/*----------------- middleware user permission ----------------*/
function Autherize(req,res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){  console.log('stuch step 3'); return res.sendStatus(401)}
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err){return res.sendStatus(403)}
        req.user = user;
        req.params.id = req.params.id;
        next();
    })
}
module.exports = router;