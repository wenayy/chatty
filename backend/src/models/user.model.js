import mongoose from "mongoose";

const userSchema =new mongoose.Schema(
   { email:{
     type:   String,
    required :true,
    unique:true,

},
fullName:{
    type:String,
    required :true,
},
password:{
    required:true,
    minlength:8,
    type:String,
},
profilepic:{
    type:String,
    default:""
}


},
{timestamps:true}

);

const User=mongoose.model("User", userSchema); // first letter to be User within model
export default User;