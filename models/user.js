const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: {
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
      role: {
        type: String,
        enum: ["authUser", "admin"],
        required: [true, "Please specify user role"],
        default: "authUser"
      },
      password: {
        type: String,
        required: [true, 'smartAss we need a password to protect your data']
      },
      created: {
        type: Date,
        default:new Date.now()
      }
})

module.exports = mongoose.model("user", userSchema)