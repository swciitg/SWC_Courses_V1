const express = require("express");
const Prof = require("../models/Prof-TA");
const TA = require("../models/Prof-TA");
const User = require("../models/user");

const router = express.Router({ mergeParams: true });
exports.getProf = async(req,res)=>{
    try{
      const {id} = req.params;
      const prof = await Prof.findById(id);
      const {email} = req.body;
      let data ={email}; 
      console.log(prof.email);
      return res.status(200).json({ status: "Success",data : prof });
    }
    catch(error){
       console.log(error.message);
       return res
    .status(424)
    .json({ status: "Failed", message: "Request failed" });
    }
}
exports.postProf = async(req,res)=>{
  try{
    const {email} = req.body;
    const newProf = new Prof({email});
    const user=User.find({email});
    console.log(req.body.email);
    if(user){
      newProf.user=user.id;
    }
    const Professor = await newProf.save();
    if (Professor)
    return res.status(200).json({ status: "Success", data: Professor });
  else res.status(424).json({ status: "Failed", message: "Invalid Data" });
  }
    catch(error){
      console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
    }
}
exports.editProf = async(req,res)=>{
  try{
    const {email} = req.body;
    let data = {email};
    const id = req.params.id;
    const prof = await Prof.findByIdAndUpdate(id,data);
    if(prof){
      return res.status(200).json({status:"Success", data:prof});
    }
    else {
      res.status(424).json({status:"Failed",data:"Invalid data"});
    }
  }
  catch(error){
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
}
exports.deleteProf = async(req,res)=>{
  try{
    const {id}=req.params;
    const prof = await Prof.findById(id);
    await Prof.findByIdAndRemove(id);
    return res.status(200).json({status:"Success"});
  }
  catch(err){
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
}

exports.getTA = async(req,res)=>{
  try{
    const {id} = req.params;
    const ta = await TA.findById(id);
    const {email}=req.body;
    let data ={email};
    console.log(ta.email);
    return res.status(200).json({ status: "Success",data : ta });
  }
  catch(error){
     console.log(error.message);
     return res
       .status(424)
       .json({status:"Failed",message:"Request Failed"});
  }
}
exports.postTA = async(req,res)=>{
  try{
    const {email} = req.body;
    const newTA = new TA({email});
    const user=User.find({email});
    console.log(req.body.email);
    if(user){
      newTA.user=user.id;
    }
    const TA = await newTA.save();
    if (TA)
    return res.status(200).json({ status: "Success", data: TA });
  else res.status(424).json({ status: "Failed", message: "Invalid Data" });}
  catch(error){
    console.log(error.message);
  return res
    .status(424)
    .json({ status: "Failed", message: "Request failed" });
  }
}
exports.editTA = async(req,res)=>{
  try{
    const {email} = req.body;
    let data = {email};
    const id = req.params.id;
    const ta = await TA.findByIdAndUpdate(id,data);
    if(ta){
      return res.status(200).json({status:"Success",data:ta});
    }
    else {
      res.status(424).json({status:"Failed",data:"Invalid data"});
    }
  }
  catch(error){
    console.log(error.message);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
}
exports.deleteTA = async(req,res)=>{
  try{
    const {id}=req.params;
    const ta = await TA.findById(id);
    await TA.findByIdAndRemove(id);
    return res.status(200).json({status:"Success"});
  }
  catch(err){
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
}
