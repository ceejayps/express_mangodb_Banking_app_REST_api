if(process.env.NODE_ENV !=="production"){
    require('dotenv').config({ path: '.env' });
}
const express = require("express");
const transaction = require("../models/transaction");
const user = require("../models/user");
const router = express.Router(); 


router.post('/',async (req,res)=>{

})



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