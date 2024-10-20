import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadonCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;

    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET 
    });

    // Determine the resource type based on the file extension
    const fileExtension = localFilepath.split('.').pop();
    let resourceType = 'auto';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension.toLowerCase())) {
      resourceType = 'image';
    } else if (['pdf', 'doc', 'docx'].includes(fileExtension.toLowerCase())) {
      resourceType = 'raw';
    }

    // Upload the file to Cloudinary with the correct resource type
    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: resourceType,
    });

    // File has been uploaded successfully
    console.log("File is uploaded:", response.url);

    // Remove the locally saved temporary file
    fs.unlinkSync(localFilepath);

    return response.secure_url;
  } catch (error) {
    // Remove the locally saved temporary file as the upload operation failed
    if (fs.existsSync(localFilepath)) {
      fs.unlinkSync(localFilepath);
    }

    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export { uploadonCloudinary };
