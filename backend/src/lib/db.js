import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
   let connect=     await mongoose.connect(process.env.MONGO_URI);
     console.log(`MongoDB connected :${connect.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection failed");
        console.error(error);
    }
}
