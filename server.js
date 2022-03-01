if(process.env.NODE_ENV !=="production"){
    require('dotenv').config({ path: '.env' });
}

const express = require("express");
const server = express();
const bcrypt = require("bcrypt");
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require('./routes/index');
const userRoute = require('./routes/users')
const mongoose  = require("mongoose");
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongoose.connection;
db.on("error", error=>console.error(error))
db.once("open", ()=>console.log("connected to db"))


server.set('view engine', 'ejs')
server.set('views', __dirname+'/views')
server.set('layout', 'layouts/layout')
server.use(expressLayouts)
server.use(express.static('public'))
server.use('/',indexRouter)
server.use('/users',userRoute)



server.listen(process.env.Port || 1876)