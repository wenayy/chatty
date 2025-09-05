import mongoose from "mongoose"

const messageSchema= new mongoose.Schema({
   SenderId:{
         type:mongoose.Schema.Types.ObjectId,
       ref:"User", // refernce to the user model
       required:true

    },
    RecieverId:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId, //type	It's an ObjectId (used to reference another document)
        required:true

    },
    text:{
        type:String
    },
    image:{
        type:String
    }

}, 
{timestamps:true})

export   const Message=mongoose.model("messageScehma",messageSchema);