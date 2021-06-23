const express = require("express");
const Prof = require("../models/Prof");
const TA = require("../models/TA");
const user = require("../models/user");

const router = express.Router({ mergeParams: true });
exports.getProf = async(req,res)=>{
    try{
      const {id} = req.params;
      const prof = await Prof.findById(id);
      const {email} = req.body;
      let data ={email}; 
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
  const id = req.params.id;
    if(user.email=Prof.find(email)){
    Prof.save({_id:id});
    }
    try{
      const {email} = req.body;
      const newProf = new Prof({email});
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
      return res.status(200).json({status:"Success",data:Prof});
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
    const {email}=req.body;
    let data ={email}
    const ta = await TA.findById(id);
    return res.status(200).json({ status: "Success",data : TA });
  }
  catch(error){
     console.log(error.message);
  }
}
exports.postTA = async(req,res)=>{
  const id = req.params.id;
    if(user.email=TA.find(email)){
    TA.save({_id:id});
    }
  try{
    const {email} = req.body;
    const newTA = new TA({email});
    const TA = await newTA.save();
    if (TA)
    return res.status(200).json({ status: "Success", data: TA });
  else res.status(424).json({ status: "Failed", message: "Invalid Data" });
  }
  catch(error){
    console.log(error.message);
  return res
    .status(424)
    .json({ status: "Failed", message: "Request failed" });
  }
}
exports.editTA = async(req,res)=>{
  try{
    let data = {email};
    const id = req.params.id;
    const ta = await TA.findByIdAndUpdate(id,data);
    if(ta){
      return res.status(200).json({status:"Success",data:TA});
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
