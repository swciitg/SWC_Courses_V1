const mongoose = require("mongoose");
const user = require("./user");

const TASchema = new mongoose.Schema({
    email:{
      type: String
    },
    user:{
      type:mongoose.Schema.ObjectId,
      ref:"User"
    }
  });
  module.exports=mongoose.model("TA",TASchema);