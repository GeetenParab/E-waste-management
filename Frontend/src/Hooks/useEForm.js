import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../SignIn/AuthContext";
import { useNavigate } from "react-router-dom";

 
const useEform = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const  {authUser} = useAuthContext();

  const Eform = async ({ itemName, weight, pickupDate, PhoneNumber, photo, location }) => {
    const success = handleInputErrors({ itemName, weight, pickupDate, PhoneNumber, photo, location ,authUser});
    if (!success) return;

    setLoading(true);
    try {
        const formData = new FormData(); // FormData to handle file uploads
        formData.append("itemName", itemName);
        formData.append("weight", weight);
        formData.append("pickupDate", pickupDate);
        formData.append("PhoneNumber", PhoneNumber);
        formData.append("location", location);
        formData.append("photo", photo); // append file
     
        const res = await fetch("/api/waste/disposal", {
          method: "POST",
          body: formData, // Send formData
          headers: {
            // 'Content-Type': 'application/json', // Do not set this for FormData, browser will set correct boundary.
          },
        });
     
        const data = await res.json();
        console.log(data);
     
        if (data.error) {
          throw new Error(data.error);
        }
     
        toast.success("E-waste PickUp request successful!");
            navigate('/services');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, Eform };
};

export default useEform;

function handleInputErrors({ itemName, weight, pickupDate, PhoneNumber, photo, location ,authUser}) {
    // Check for empty fields
    if(!authUser){
        toast.error("Login to make pickup request");
        return false;
    }
    if (!itemName || !weight || !pickupDate || !PhoneNumber || !photo || !location) {
      toast.error("Please fill in all fields");
      return false;
    }
  
    // Validate itemName (ensure it's a non-empty string)
    if (typeof itemName !== "string" || itemName.trim().length === 0) {
      toast.error("Please enter a valid item name");
      return false;
    }
  
    // Validate weight (must be a positive number)
    if (isNaN(weight) || weight <= 0) {
      toast.error("Please enter a valid weight greater than 0");
      return false;
    }
    
  
    // Validate PhoneNumber (check if it's a valid 10-digit number)
    const phoneRegex = /^\d{10}$/; // Adjust this based on your region’s phone number format
    if (!phoneRegex.test(PhoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    
    // Validate location (ensure it's a non-empty string)
    if (typeof location !== "string" || location.trim().length === 0) {
      toast.error("Please enter a valid location");
      return false;
    }
  
    return true;
  }