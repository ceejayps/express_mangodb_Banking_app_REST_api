const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type : String,
        require: true,
    }
})

module.exports = mongoose.model("user", userSchema)