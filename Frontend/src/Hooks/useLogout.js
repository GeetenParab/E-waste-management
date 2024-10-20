import toast from "react-hot-toast";
import { useAuthContext } from "../SignIn/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const useLogout = () => {

    const [loading,setloading] = useState(false);
    const {setauthUser} = useAuthContext();
    const navigate = useNavigate();

    const logout =  async () =>{
        setloading(true);
        try {
            const res = await fetch("/api/auth/logout",{
                method:"POST",
                headers:{"Content-Type": "application/json"},
            });

            const data = await res.json();

            if(data.error){
                throw new Error(data.error)
              }

              localStorage.removeItem("user");
                setauthUser(null);

        } catch (error) {
            toast.error(error.message);
        }finally{
            setloading(false);
            toast.success("Sign-Out successfull!");
            navigate('/signIn');
        }
    };
    return {loading,logout};
};

export default useLogout;