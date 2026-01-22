import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const userToken = localStorage.getItem("userToken");
    const captainToken = localStorage.getItem("captainToken");

    if (userToken) return { isAuth: true, role: "user" };
    if (captainToken) return { isAuth: true, role: "captain" };

    return { isAuth: false, role: "" };
  });

  const login = (token, role) => {
    localStorage.removeItem(role === "user" ? "captainToken" : "userToken");
    localStorage.setItem(`${role}Token`, token);

    setAuthState({ isAuth: true, role });
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("captainToken");
    setAuthState({ isAuth: false, role: "" });
  };

  const value = useMemo(
    () => ({ ...authState, login, logout }),
    [authState]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
