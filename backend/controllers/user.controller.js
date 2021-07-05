const express = require("express");
const User = require("../models/user");
const Course = require("../models/course");

const router = express.Router({ mergeParams: true });

exports.getAllCoursesTaken = async(req,res) => {
        try{
        const id = req.params.id;
        await User.findById(req.user.id).populate('coursesTaken')
        .exec(function (err){
                if(err) return handleError(err);
        });
        let user = User.findById(req.user.id);
        res.status(200).json({status:"Success",user:user.coursesTaken});
        User.populated('courseTaken');
        }
        catch(error){
                console.log(error.message);
     return res
       .status(424)
       .json({status:"Failed",message:"Request Failed"});
        }
}

exports.getAllCoursesTeach = async(req,res) => {
        try{
        const id = req.params.id;
        await User.findById(req.user.id).populate('coursesTeach')
        .exec(function (err){
                if(err) return handleError(err);
        });
        let user = User.findById(req.user.id);
        res.status(200).json({status:"Success",user:user.coursesTeach});
        User.populated('courseTeach');
        }
        catch(error){
                console.log(error.message);
     return res
       .status(424)
       .json({status:"Failed",message:"Request Failed"});
        }
}