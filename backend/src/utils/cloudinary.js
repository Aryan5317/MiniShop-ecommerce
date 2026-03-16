import { v2 as cloudinary } from "cloudinary"
import ApiError from "./errorHandler.js"
import fs from fs

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    secret_key: process.env.CLOUDINARY_SECRET_KEY
})

export const UploadOnCloudinary = async (filesLocalPath) => {
    try {
        if (!filesLocalPath) {
            console.log("Files path is required")
            throw new ApiError(400, "File path required on cloudinary to upload")
        }
        console.log("files path is: ", filesLocalPath)
        const response = await cloudinary.uploader.upload(filesLocalPath, {
            resource_type: "auto",
        })
        if (!response) {
            throw new ApiError(500, "Error during file upload on cloudinary")
        }
        console.log("FIle upload successfully: ", response.url)

        if (fs.existsSync(filesLocalPath)) {
            fs.unlinkSync(filesLocalPath)
        }
        return response;
    }
    catch (err) {
        console.log("Cloudinary upload error: ", err.message)
        if (fs.existsSync(filesLocalPath)) {
            fs.unlinkSync(filesLocalPath);
        }
        throw new ApiError(500, "Cloudinary Upload Error");
    }
}