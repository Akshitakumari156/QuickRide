import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const userToken = localStorage.getItem("userToken");
    const captainToken = localStorage.getItem("captainToken");

    if (userToken) {
      return {
        isAuth: true,
        role: "user",
        user: null,
        loading: true,
      };
    }

    if (captainToken) {
      return {
        isAuth: true,
        role: "captain",
        user: null,
        loading: true,
      };
    }

    return {
      isAuth: false,
      role: "",
      user: null,
      loading: false,
    };
  });

  const getProfile = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const captainToken = localStorage.getItem("captainToken");

      const token = userToken || captainToken;

      if (!token) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
        }));
        return;
      }

      const endpoint = userToken
        ? "http://localhost:5000/api/user/profile"
        : "http://localhost:5000/api/captain/profile";

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAuthState((prev) => ({
        ...prev,
        user: response.data,
        loading: false,
      }));
    } catch (error) {
      console.log(error);

      localStorage.removeItem("userToken");
      localStorage.removeItem("captainToken");

      setAuthState({
        isAuth: false,
        role: "",
        user: null,
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (authState.isAuth) {
      getProfile();
    }
  }, []);

  const login = (token, role) => {
    localStorage.removeItem(
      role === "user" ? "captainToken" : "userToken"
    );

    localStorage.setItem(`${role}Token`, token);

    setAuthState({
      isAuth: true,
      role,
      user: null,
      loading: true,
    });

    getProfile();
  };

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("captainToken");

    setAuthState({
      isAuth: false,
      role: "",
      user: null,
      loading: false,
    });
  };

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
      getProfile,
    }),
    [authState]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);