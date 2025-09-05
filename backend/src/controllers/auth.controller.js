import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { protectRoute } from "../middlewares/auth.middleware.js";

import cloudinary from "../lib/cloudnary.js"
 
export const signup=async(req,res)=>{
    const {fullName, password, email, profilepic}=req.body;
    try{
        if(!fullName||!email|| !password) res.status(200).json({msg:"all fields are required"});
       if ( password.length < 8) {
    return res.status(400).json({
        msg: "User password must be at least 8 characters long"
    });
}

        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({msg:"user already exist"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newuser= new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        });

        await newuser.save();
            // generate jwt token 
            generateToken(newuser._id,res);
            
           res.status(200).json({msg:"user created succesfully", 
            _id:newuser._id,
            fullName:newuser.fullName,
            email:newuser.email,
            profilepic:newuser.profilepic,
           
 
           });

        
         
      

    }
    catch(e){
        res.status(500).json({msg:"internal code error"})
        console.log(e);

    }
    
}

export const login=async(req,res)=>{
    const {email, password}=req.body;

    try{
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({msg:"user don't exist"});
    }
 let temp=   await bcrypt.compare(password,user.password);
 if(!temp){
  return  res.send("error");
 }
 generateToken(user._id,res);

  return res.status(200).json({ 
    email:user.email
 })



    }
    catch(e){
  return res.send("Auth route is not  working");
    }
   
}

export const logout= (req,res)=>{
    // just clear out the cookie
    try{
        res.cookie("token", "", {
  maxAge: 0,
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV !== "development"
});
  // res.cookie is a synchronous function  no need to do await
      return   res.status(200).json({msg:"everything went right you have been logged out"})

    }
    catch(e){
      return   res.status(500).json({msg:"something went wrong on the backend", error: e.message})
    }

     
}

export const updateProfile=async(req,res)=>{
    try{
        const {profilepic}= req.body;
       const userId= req.user._id; // from the middleware
       if(!profilepic) return res.status(400).json("please upload profile pic");
let uploadResponse=await cloudinary.uploader.upload(profilepic)
const updateduser=await User.findByIdAndUpdate(userId,{profilepic:uploadResponse.secure_url}, {new:true}); // this siwll give updated if u do new:true
return  res.status(200).json({data:updateduser}); // updated user jaayega frontend mein


    }
    catch(e){
    res.status(500).json(e.message);
    }

}

export const check = async (req,res)=>{
    try {
      return  res.status(200).json({"user":req.user});
    }
    catch(e){
        return res.send(e.message);
    }

}