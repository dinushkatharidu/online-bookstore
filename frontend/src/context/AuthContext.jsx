// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import api from "../api/axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);


// Helper: read initial auth state from localStorage
const getInitialAuthState = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    try {
      return {
        token: storedToken,
        user: JSON.parse(storedUser),
      };
    } catch (e) {
      console.error("Failed to parse stored user", e);
      return { user: null, token: null };
    }
  }

  return { user: null, token: null };
};

export const AuthProvider = ({ children }) => {
  const initial = getInitialAuthState();

  const [user, setUser] = useState(initial.user); 
  const [token, setToken] = useState(initial.token); 
  const [loading] = useState(false); 

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);
    }

    return res.data;
  };

  const register = async (name, email, password, role) => {
    const res = await api.post("/auth/register", {
      name,
      email,
      password,
      role,
    });

    if (res.data.success) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setToken(res.data.token);
      setUser(res.data.user);
    }

    return res.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isSeller: user?.role === "seller",
        isBuyer: user?.role === "buyer",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
