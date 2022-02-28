const express = require("express");
const server = express();

const bcrypt = require("bcrypt");
const expressLayouts = require("express-ejs-layouts");

server.set('view engine', 'ejs')
server.set('views', __dirname+'/views')
server.set('layout', 'layouts/layout')
server.use(express.static('public'))

server.listen(process.env.Port || 1876)
