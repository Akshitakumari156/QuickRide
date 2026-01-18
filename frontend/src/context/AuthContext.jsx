import { createContext,useContext, useEffect, useState } from "react";
const AuthContext=createContext();
export const AuthProvider=({children})=>{
        const[isAuth,setIsAuth]=useState(false);
        useEffect(()=>{
            const token=localStorage.getItem("token");
            if(token){
                setIsAuth(true);
            }
            else {
                setIsAuth(false);
            }

        },[])
        const login=(token)=>{
            localStorage.setItem("token",token);
            setIsAuth(true);
        }
        return (
            <AuthContext.Provider
            value={{login,isAuth}}
            >
                {children}
            </AuthContext.Provider>
            )
}
export const useAuth=()=>{
    return useContext(AuthContext);
}