import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
const messagerouter=express.Router();
import { getuser, getMessages,sendmessage } from "../controllers/message.controller.js";


messagerouter.get("/users",protectRoute,getuser);
messagerouter.get("/:id",protectRoute,getMessages);
messagerouter.post("/send/:id",protectRoute,sendmessage);


export default messagerouter;
