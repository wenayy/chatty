import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import cookieParser from "cookie-parser";

export const protectRoute=async (req,res,next)=>{
    try{
        console.log(req.cookies);
        const token=req.cookies.token; // this only came because or cookie-Parser;
        if(!token) {return res.status(411).json("user is invalid go back")}
        const decoded =jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({msg:"invalid token"});
const user =await User.findById(decoded.userId).select("-password");
if(!user) {return   res.status(401).json({msg:"user is not there"});}

req.user= user;
next();

    }
    catch(e){
        return res.status(500).json({"message":e.message});
    }

}
 
