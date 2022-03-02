if(process.env.NODE_ENV !=="production"){
    require('dotenv').config({ path: '.env' });
}

const express = require("express");
const transaction = require("../models/transaction");
const router = express.Router(); 

//getall
router.get('/', async(req,res)=>{
    const  transactions = await transaction.find();
 })
 


module.exports = router;