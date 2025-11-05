import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
// import Update from "../models/update.js";
import sendResponse from "../helper/sendResponse.js";


dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadFileController = async (req, res) => {
  try {
    if (!req.file) {
      return sendResponse(res, 403, null, true, "No file uploaded.");
    }

    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "updates_photos",
    });

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    
    return sendResponse(res, 200, { photoUrl: result.secure_url }, false, "File uploaded successfully!");
  } catch (error) {
    console.error("Upload error:", error);
    return sendResponse(res, 500, null, true, "File upload failed", error);
  }
};
