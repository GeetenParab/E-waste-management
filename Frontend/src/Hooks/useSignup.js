import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../SignIn/AuthContext";
// import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);  // For tracking loading state
  const navigate = useNavigate();
  const {authUser,setauthUser} = useAuthContext();
  
  const signup = async ({ fullName, username, password, confirmPassword, email, phoneNumber }) => {
    const success = handleInputErrors({ fullName, username, password, confirmPassword, email, phoneNumber });
    if (!success) return;

    setLoading(true);  // Set loading to true before API call
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword, email, phoneNumber }),
      });

      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      setauthUser(data);
      // Display success toast
      toast.success("Signup successfull! Welcome!");
      navigate('/');
      
      // context
      // setauthUser(data);

    } catch (error) {
      toast.error(error.message || "An error occurred during signup");
    } finally {
      setLoading(false);  // Set loading to false after API call completes
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, email, phoneNumber }) {
  if (!fullName || !username || !password || !confirmPassword || !email || !phoneNumber) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    toast.error("Please enter a valid 10-digit phone number");
    return false;
  }

  return true;
}
