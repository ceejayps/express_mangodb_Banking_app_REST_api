const express = require("express");
const user = require("../models/user")
const router = express.Router(); 

//get all users
router.get('/', (req,res)=>{
res.send("ok")
})

//get one users
router.get('/:id', (req,res)=>{
    res.send("ok")
    })

//create one users
router.post('/', (req,res)=>{
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