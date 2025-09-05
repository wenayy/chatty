import {v2 as cloudinary} from "cloudinary";
import {config} from "dotenv"
config();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_key,
    secret:process.env.CLOUDINARY_API_Secret

})

export default cloudinary