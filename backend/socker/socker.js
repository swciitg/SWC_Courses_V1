const socketio=require('socket.io');
const mongoose = require('mongoose');
const express = require("express");
const app=express();

const chatMsg=require('../models/discMsg');
const courses =require('../models/course');
const formatMessage=require('./utils/message');

const {userJoin,getCurrentUser,userLeave,getTeamUsers}=require('./utils/users');

const socker=  (server) => {

    const io=socketio(server);
    io.on('connection',async (socket)=>{
        
        socket.on("joinCourseDiscussion", async ({username,course})=>{

            console.log('a user name : '+ username+ ' connected');
            //getting previous data
            const coursedata=await courses.findOne({_id:course});
            const msgs=await coursedata.discussion;

        for(let i = 0 ; i < msgs.length; i++) {
          socket.emit('chat message',formatMessage(msgs[i].name,msgs[i].msg,msgs[i].updatedAt));
        }

        const user=userJoin(socket.id,username,course);
            socket.join(user.course);

        });

        socket.on('chat message', (msg) => {
            const user=getCurrentUser(socket.id);
           
          var chatmsg={
              name: user.username,
                msg: msg,
                course: user.course
          };
          
        courses.findOneAndUpdate(
          { _id: user.course }, 
          { $push: { discussion: chatmsg} },
         function (error, success) {
               if (error) {
                   console.log(error);
               } 
           });

          io.emit('chat message', formatMessage(user.username,msg));
        });

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
        return io;
    });
    
};



module.exports=socker; 

