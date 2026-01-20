import { createContext,useContext, useEffect, useState } from "react";
const AuthContext=createContext();
export const AuthProvider=({children})=>{
        const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token && token !== "undefined" && token !== "null";
  });
        const logout=()=>{
            localStorage.removeItem("token");
            setIsAuth(false);
        }
        const login=(token)=>{
            localStorage.setItem("token",token);
            setIsAuth(true);
        }
        return (
            <AuthContext.Provider
            value={{login,isAuth,logout}}
            >
                {children}
            </AuthContext.Provider>
            )
}
export const useAuth=()=>{
    return useContext(AuthContext);
}