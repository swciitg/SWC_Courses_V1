const mongoose = require("mongoose");
const user = require("./user");

const TASchema = new mongoose.Schema({
    email:{
      type: String,
      ref:"User"
    }
  });
module.exports=mongoose.model("TA",TASchema);