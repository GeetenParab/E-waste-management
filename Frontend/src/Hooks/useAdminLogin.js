import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAdminContext } from "../Admin/AdminContext";

const useAdminLogin = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const  {token,setToken} = useAdminContext();
  const login = async ({ email, password }) => {
    const success = handleInputErrors({ email, password });
    if (!success) return;

    setloading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.status !== 200) {
        throw new Error(data.message || "Something went wrong");
      }
 
      const token = data.token;  // assuming the token is within the `data` object

      // Store the token in localStorage as a plain string
      localStorage.setItem("token", token);
      
      // Set the token in the state
      setToken(token);
      
      // Navigate to dashboard
      toast.success("SignIn successful! Welcome!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  return { loading, login };
};

export default useAdminLogin;

function handleInputErrors({ email, password }) {
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password is incorrect!");
    return false;
  }

  return true;
}
