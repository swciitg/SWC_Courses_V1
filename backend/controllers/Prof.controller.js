const express = require("express");
const Prof = require("../models/Prof");
const TA = require("../models/TA");
const User = require("../models/user");

const router = express.Router({ mergeParams: true });
exports.getProf = async(req,res)=>{
    try{
      const {id} = req.params;
      const prof = await Prof.findById(id)
            .populate('users');
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

exports.getAllProfs = async(req,res)=>{
  try{
    let query = Prof.find();
    const Profs = await query;
    if(Profs.length){
      return res.status(200).json({Profs});
    }else
      return res.status(424).json({status:"Failed",message:"Invalid"});
    }
    catch(err){
      console.log(err.message);
      return res
        .status(424)
        .json({status:"Failed",message:"ERROR"});
  }
}
exports.postProf = async(req,res)=>{
  try{
    const {email} = req.body;
    const newProf = new Prof({email});
    let data = {role:"Prof"};
    const user=await User.find({email:email});
    
    if(user.length!=0){
      newProf.user=user[0].id;
      await User.findByIdAndUpdate(newProf.user,data);
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
exports.getAllTAs = async(req,res)=>{
  try{
    let query = TA.find().populate('users');
    const TAs = await query;
    if(TAs.length){
      return res.status(200).json({TAs});
    }else
      return res.status(424).json({status:"Failed",message:"Invalid"});
    }
    catch(err){
      console.log(err.message);
      return res
        .status(424)
        .json({status:"Failed",message:"ERROR"});
  }
}
exports.postTA = async(req,res)=>{
  try{
    if(req.user.role == "Prof"){
  
    const {email} = req.body;
    const newTA = new TA({email});
    const user=User.find({email:email});
    console.log(req.body.email);
  
    if(user[0]){
      newTA.user=user[0].id;
      let data = {role:"TA"};
      await User.findByIdAndUpdate(newTA.user,data);
    const ta = await newTA.save();
    if (ta)
    return res.status(200).json({ status: "Success", data: ta });
  else res.status(424).json({ status: "Failed", message: "Invalid Data" });}
  }
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
    if(req.user.role == "Prof"){
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
    if(req.user.role == "Prof"){
    const {id}=req.params;
    const ta = await TA.findById(id);
    await TA.findByIdAndRemove(id);
    return res.status(200).json({status:"Success"});
  }
}
  catch(err){
    console.log(err);
    return res
      .status(424)
      .json({ status: "Failed", message: "Request failed" });
  }
}
