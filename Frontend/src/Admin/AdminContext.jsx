import { createContext, useContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const useAdminContext = () =>{

    return useContext(AdminContext);
}


export const AdminContextProvider = ({children})=>{
            const [token,setToken] = useState(localStorage.getItem("token") || null)

            useEffect(() => {
                if (token) {
                  // Store the token as a plain string
                  localStorage.setItem("token", token);
                } else {
                  localStorage.removeItem("token");
                }
              }, [token]);
            return <AdminContext.Provider value={{token,setToken}}>
                {children}
            </AdminContext.Provider>

}