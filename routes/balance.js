if(process.env.NODE_ENV !=="production"){
    require('dotenv').config({ path: '.env' });
}
const express = require("express");
const transaction = require("../models/transaction");
const user = require("../models/user");
const router = express.Router(); 




module.exports = router;