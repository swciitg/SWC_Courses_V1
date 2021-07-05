const mongoose=require("mongoose")

const chatMsgSchema= new mongoose.Schema({
    name:{type:String, required:true},
    msg:{type:String, required:true},

    // course: {type:String, required:true},
    // prof: {type:Boolean, required:true},
    // ta:{type:Boolean, required:true}
}, 
{
    timestamps: true
});

module.exports=mongoose.model("chatMsg",chatMsgSchema);