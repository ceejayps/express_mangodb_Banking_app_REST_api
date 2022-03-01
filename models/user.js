const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "smartAss we all know u have a name.. enter it"],
      },
      email: {
        type: String,
        unique: [true, "smartAss we already have this email, use another!"],
        lowercase: true,
        trim: true,
        required: [true, "smartAss we need an email to know who you are"],
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: 'does {VALUE} looks like an email to you?!'
        }
      },
      Balance: {
        type: Number, 
      },
      accountNumber: {
        type: Number, 
        unique: [true, ""],
        required: [true, ""],
      },
      role: {
        type: String,
        enum: ["authenticated", "admin", "public", "super admin"],
        required: [true, "Please specify user role"],
        default: "public"
      },
      password: {
        type: String,
        required: [true, 'smartAss we need a password to protect your data'],
      },
      confirmed: {
        type: Boolean,
        required: true, 
        default: false,
      },
      blocked: {
        type: Boolean,
        required: true, 
        default: false,
      },
      confirmationToken: {
        type: String,
        required: true, 
      },
      resetPasswordToken: {
        type: String, 
        default:"nan"
      },
      createdAt: {
        type: Date,
        default: Date.now()
      ,
      updatedAt: {
        type: Date,
        default: Date.now()
      }}

})

module.exports = mongoose.model("User", userSchema)