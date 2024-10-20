import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../SignIn/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
     const [loading,setloading] = useState(false);
     const  {setauthUser} = useAuthContext();
     const navigate = useNavigate();
     const login = async({ email, password})=>{
         const success = handleInputErrors({ email, password })
         if(!success) return;


         setloading(true);
           try {
                  const res = await fetch("/api/auth/login",{
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                    body:JSON.stringify({email, password})
                  })

                  const data = await res.json();
                  console.log(data);

                  if(data.error){
                    throw new Error(data.error)
                  }

                  //localstorage
                  localStorage.setItem("user",JSON.stringify(data));
                  //context
                  setauthUser(data);
                  toast.success("SignIn successfull! Welcome!");
                  navigate('/');

            
           } catch (error) {
              toast.error(error.message);
           }  finally{
            setloading(false);
           }
     };
     return {loading,login};
};

export default useLogin;


function handleInputErrors({  email, password}) {
	if (!email || !password ) {
		toast.error("Please fill in all fields");
		return false;
	}


	if (password.length < 6) {
		toast.error("Password is incorrect!");
		return false;
	}

	return true;
}