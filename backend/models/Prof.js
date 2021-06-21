const mongoose = require("mongoose");

const ProfSchema = new mongoose.Schema({
    email:{
      type: mongoose.ObjectId
    },
    user:{ref:"user"}
  });
  
module.exports=mongoose.model("Professor",ProfSchema);