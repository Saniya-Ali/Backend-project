import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            // options
            resourse_type:"auto"
        })
        // File has been uploaded successfully
        console.log("File has been uploaded on cloudinary", response.url)
        return response
    } catch (error) {
        // removing the file from local storage so that there won't be any corrupt files on our server in case the upload to cloudinary fails
        fs.unlinkSync(localFilePath)
        return null
    }
  }

//   cloudinary docs - 
//   cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

export {uploadOnCloudinary}