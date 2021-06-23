const mongoose = require("mongoose");
const user = require("./user");

const ProfSchema = new mongoose.Schema({
    email:{
      type: String,
      ref:"User"
    }
  });
  
module.exports = mongoose.model("Prof",ProfSchema);