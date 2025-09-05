 
import React from "react"
import Navbar from "./components/Navbar"
import Homepage from "./Pages/Homepage"
import Login from "./Pages/Login"
 
 import Profile from "./Pages/Profile"
import Signup from "./Pages/Signup"
import {Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import toast, { Toaster}  from "react-hot-toast"
//import { axiosInstance } from "./lib/axios"
 function App() {
  const {authUser,checkAuth,isCheckingAuth}= useAuthStore()

  useEffect(()=>{
checkAuth()

  },[checkAuth])

  console.log({authUser})

if (isCheckingAuth) {
  return (
    <div className="flex justify-center items-center h-screen mw">
      <Loader className="size-10 animate-spin" />
    </div>
  );
}



  
   return (
     <div className="text-slate-400 font-semibold">
     <Navbar></Navbar>
      
    rrr
     <Routes>
      <Route path="/" element={authUser?<Homepage></Homepage>:<Navigate to="/login"/> } ></Route>
      <Route path="/profile" element={authUser? <Profile></Profile>:<Navigate to="/login"/> } ></Route>
     
      <Route path="/signup" element={!authUser? <Signup></Signup>:<Navigate to="/"></Navigate>}></Route>
      </Routes>
    
 <Toaster position='top-center' reverseOrder={false}></Toaster>
     </div>
   )
 }
 
 export default App