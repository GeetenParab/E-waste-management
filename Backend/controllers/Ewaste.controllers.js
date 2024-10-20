import Ewaste from '../Models/Ewaste.model.js';
import { uploadonCloudinary } from "../utils/Cloudinary.js";

export const pickupRequest = async (req, res) => {
    try {
        const { itemName, weight, PhoneNumber, location, pickupDate } = req.body;
        const loggedInUser = req.user._id; 
    
        // Ensure req.files.photo exists and retrieve the file path
        if (!req.files || !req.files.photo || req.files.photo.length === 0) {
          return res.status(400).json({ error: "Photo is required" });
        }
    
        const PhotoPath = req.files.photo[0].path;
        let PhotoUrl = await uploadonCloudinary(PhotoPath);
    
        const parsedPickupDate = new Date(pickupDate);
        
        // Create new ewaste pickup request
        const EwastePickupRequest = new Ewaste({
          itemName,
          weight,
          PhoneNumber,
          location,
          photo: PhotoUrl,
          pickupDate: parsedPickupDate,
          owner: loggedInUser,
        });
    
        await EwastePickupRequest.save();
        res.status(201).json(EwastePickupRequest);
    
      } catch (error) {
        console.log("Error in EwasteForm controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
};


export const getAllRequest = async (req, res) => {
    try {
      const loggedInUser = req.user._id;
  
      // Find all requests where the logged-in user is the owner
      const allRequests = await Ewaste.find({ owner: loggedInUser });
  
      res.status(200).json(allRequests);
    } catch (error) {
      console.log("Error in getAllRequest:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  