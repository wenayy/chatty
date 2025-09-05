import express from "express";
const router =express.Router();
import { protectRoute } from "../middlewares/auth.middleware.js";
import { signup, login, logout, updateProfile, check } from "../controllers/auth.controller.js";

router.post("/signup", signup)

router.post("/login",  login)

router.post("/logout", logout)

router.put("/update-profile",protectRoute,updateProfile);

router.get("/check",protectRoute,check)

export default router;