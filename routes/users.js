const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const router = express.Router(); 

//get all users
router.get('/', async (req,res)=>{

    try {
        const users = await User.find()
        res.json(users);
    } catch (e) {
        return res.status(500).json({message:e})
    }
res.send("ok")
})

//get one users
router.get('/:id', (req,res)=>{
    res.send("ok")
    })

//create one users
router.post('/', async(req,res)=>{
    
    const newYouser =  await new User({
        
    fullname: req.body.fullname,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password,11)

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
router.post('/:id', (req,res)=>{
    res.send("ok")
    })

//delete one users
router.delete('/:id', (req,res)=>{
    res.send("ok")
    })


 module.exports = router;