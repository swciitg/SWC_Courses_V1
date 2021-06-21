const mongoose = require("mongoose");
  
  const TASchema = new mongoose.Schema({
    email:{
      type: mongoose.ObjectId
    },
    user:{ref:"user"}
  });

module.exports=mongoose.model("TA",TASchema);