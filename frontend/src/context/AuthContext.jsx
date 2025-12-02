import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ========================================
  // STATE
  // ========================================
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ========================================
  // ON MOUNT - CHECK IF USER IS ALREADY LOGGED IN
  // ========================================
  useEffect(() => {
    const storedUser = authService.getUser();
    const storedToken = authService.getToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // ========================================
  // REGISTER FUNCTION
  // ========================================
  const register = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.register(formData);

      setUser(response.user);
      setToken(response.token);

      return {
        success: true,
        message: "Registration successful! ",
        user: response.user,
      };
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGIN FUNCTION
  // ========================================
  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(credentials);

      setUser(response.user);
      setToken(response.token);

      return {
        success: true,
        message: "Login successful!",
        user: response.user,
      };
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGOUT FUNCTION
  // ========================================
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setError(null);
  };

  // ========================================
  // CLEAR ERROR FUNCTION
  // ========================================
  const clearError = () => {
    setError(null);
  };

  // ========================================
  // COMPUTED VALUES
  // ========================================
  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";

  // ========================================
  // CONTEXT VALUE
  // ========================================
  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isCustomer,
    register,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
