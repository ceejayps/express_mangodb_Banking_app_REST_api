const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt= require("jsonwebtoken");
const user = require("../models/user");
const router = express.Router(); 
const baseAccountNumber = 187600000000;
///require("dotenv").config();

//get all users
router.get('/',Autherize, async (req,res)=>{


    try {
        const users = await User.find()
        
        return res.json(users);
    } catch (e) {
        return res.status(500).json({message:e})
    }

})

//get one users
router.get('/:id', Autherize, getUser, (req,res)=>{
    res.send(res.user)
    })

//create one users
router.post('/', async(req,res)=>{
    const add = await (await User.find()).length;
    let confirmationToken =require('crypto').randomBytes(86).toString('hex');
    let accountNumber = baseAccountNumber + add
    console.log(accountNumber)

    const newYouser =  await new User({
    fullname: req.body.fullname,
    email: require('crypto').randomBytes(10).toString('hex')+"@mail.com",
    password: await bcrypt.hash(req.body.password,11),
    Balance:1.5,
    confirmationToken,
    "account number":accountNumber

    })
    try {
        const createduser = await newYouser.save()
        return res.status(201).json("success")
    } catch (e) {
        return res.status(400).json({message:e.message})   
    }


    res.send("ok")
    })

//update one users
router.post('/:id',getUser,async (req,res)=>{
    res.send(res.user.name)
    })

//delete one users
router.delete('/:id',getUser, async (req,res)=>{
    try {
        await res.user.remove();
        return res.status(200).json("user deleted")
    } catch (error) {
        return res.status(500).json({message:e.message})
    }
    })

/*----------------- middleware get user by id ----------------*/
  async  function getUser(req, res, next){
      let user;
try {
     user = await User.findById(req.params.id)
    if(user == null){
        return res.status(404).json({message:"user was not found"})
    }
} catch (e) {
    return res.status(500).json({message:e.message})
}
res.user = user;
next();
    }
/*----------------- end of middleware get user by id ----------------*/

/*----------------- middleware get user by id ----------------*/
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