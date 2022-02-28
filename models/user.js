const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type : String,
        require: true,
    },"username": {
        "type": "string",
        "minLength": 3,
        "unique": true,
        "configurable": false,
        "required": true
      },
      "email": {
        "type": "email",
        "minLength": 6,
        "configurable": false,
        "required": true
      },
      "confirmed": {
        "type": "boolean",
        "default": false,
        "configurable": false
      },
      "blocked": {
        "type": "boolean",
        "default": false,
        "configurable": false
      },
      "password": {
        "type": "password",
        "minLength": 6,
        "private": true
      },
      "resetPasswordToken": {
        "type": "string",
        "private": false
      },
      "confirmationToken": {
        "type": "string",
        "private": false
      },
      "role": {
        "configurable": true,
        "model": "role",
        "via": "users",
        "plugin": "users-permissions"
      },
      "balance": {
        "type": "float",
        "default": 0
      },
      "session_token": {
        "type": "string"
      },
      "cashier_id": {
        "type": "string",
        "default": "0"
      },
      "user_cahsier_id": {
        "type": "string",
        "default": "0"
      },
      "firstname": {
        "type": "string",
        "default": "jane",
        "required": true
      },
      "lastname": {
        "type": "string",
        "default": "doe",
        "required": true
      },
      "phone": {
        "type": "string",
        "default": "+0 (000) 000 0000",
        "required": true,
        "unique": true,
        // "regex": "^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}$"
      },
      "dob": {
        "type": "date",
        "default": "1998-10-28T17:00:00.000Z",
        "required": true
      },
      "ResetPasswordToken": {
        "type": "string"
      },
      "ComfirmToken": {
        "type": "string"
      }
})

module.exports = mongoose.model("user", userSchema)