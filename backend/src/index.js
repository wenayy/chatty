import express from "express"
const app=express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser"
 
import  router from "./routes/auth.route.js";
import messagerouter from "./routes/message.route.js";
import cors from "cors"
import { connectDB } from "./lib/db.js";
app.use(express.json());
app.use(cookieParser());
app.get("/",(req,res)=>{
    res.send("hello world");
})
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
     }
))

app.use("/api/auth",router);
app.use("/api/message",messagerouter);
let port =process.env.PORT

app.listen(port,()=>{
    console.log("server is running on port 3000");
    connectDB();
})
