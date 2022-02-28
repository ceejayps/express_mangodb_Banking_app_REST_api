const express = require("express");
const user = require("../models/user")
const router = express.Router(); 
router.get('/', (req,res)=>{
res.send("ok")
})

 module.exports = router;