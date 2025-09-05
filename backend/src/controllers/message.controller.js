 
import {Message} from "../models/message.model.js"
import User from "../models/user.model.js"

export const getuser=async(req,res)=>{
    try{
       let loggeduser=req.user._id;
       const filtereduser=await User.find({_id:{$ne:loggeduser}}).select("-password");  // populate(userId,"name") // just  
res.status(200).json(filtereduser);  
    }

    catch(e){
        return res.status(400).json("backend error")
    }
}

export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params; // renamed here
        const myId=req.user._id;

        const messages= await Message.find({
            $or:[
                {SenderId:myId , RecieverId:userToChatId},
                {SenderId:userToChatId,RecieverId:myId }
            ]
        })
        res.status(200).json (messages);


    }
    catch(e){
        res.status(500).json(e.message);

    }
}

export const sendmessage =async(req,res)=>{
    try{
        const {text,image}=req.body;
        const {id:recieverId}=req.params; // renaming the variable input which was id to recieverId;

        const senderId=req.user._id;
        let imageUrl;
        if(image){
         let url=   await cloudinary.uploader.upload(image);
            imageUrl=url.secure_url
        }
        const newmessage= new Message({
            text:text,
            image:imageUrl,
            SenderId:senderId,
            RecieverId:recieverId
        })

        await newmessage.save();

        // realtime happen with socket io

        res.status(200).json("everything went right");



    }
    catch(e){
        res.status(500).json(e.message);

    }
}