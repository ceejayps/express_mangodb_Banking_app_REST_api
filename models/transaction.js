const mongoose  = require("mongoose");

const transactionSchema = mongoose.Schema({
    
      senderAccountNumber: {
        type: Number, 
        required: [true, ""],
      },
      senderName: {
        type: String, 
        required: [true, ""],
      },
      recipientAccountNumber: {
        type: Number, 
        required: [true, ""],
      },
      recipientName: {
        type: String, 
        required: [true, ""],
      },
      Amount: {
        type: Number, 
        required: [true, ""],
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

module.exports = mongoose.model("Transaction",transactionSchema)