const mongoose = require("mongoose");
const user = require("./user");

const ProfSchema = new mongoose.Schema({
    email:{
      type: String,
      required:true
    },
    user:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
    }
  });
module.exports = mongoose.model("Prof",ProfSchema);