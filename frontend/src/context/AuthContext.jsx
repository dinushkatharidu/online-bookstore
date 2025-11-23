import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

// ============================================
// CREATE CONTEXT
// ============================================

const AuthContext = createContext();

// ============================================
// CUSTOM HOOK TO USE CONTEXT
// ============================================

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

// ============================================
// AUTH PROVIDER COMPONENT
// ============================================

export const AuthProvider = ({ children }) => {
  // state variables
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // ========================================
  // CHECK AUTH ON MOUNT
  // ========================================

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Error parsing user data", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  // ========================================
  // REGISTER FUNCTION
  // ========================================
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // STEP 1: Call API
      const response = await authAPI.register(userData);

      // STEP 2: Extract data (Assuming response returns data object)
      const { token: newToken, user: newUser } = response;

      // STEP 3: Store in localStorage
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));

      // STEP 4: Update state
      setToken(newToken);
      setUser(newUser);

      // STEP 5: Navigate to home
      navigate("/");

      // STEP 6: Show success message
      alert("Registration successful!"); // Using alert for "DISPLAY"
    } catch (err) {
      const errorMessage = err.message || "Registration failed";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGIN FUNCTION
  // ========================================
  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // STEP 1: Call API
      const response = await authAPI.login(userData);

      // STEP 2: Extract data
      const { token: newToken, user: newUser } = response;

      // STEP 3: Store in localStorage
      localStorage.setItem("token", newToken);
      localStorage.setItem("user", JSON.stringify(newUser));

      // STEP 4: Update state
      setToken(newToken);
      setUser(newUser);

      // STEP 5: Navigate based on role
      if (newUser.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

      // STEP 6: Show success message
      alert("Login successful!");
    } catch (err) {
      const errorMessage = err.message || "Login failed";
      setError(errorMessage);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOGOUT FUNCTION
  // ========================================
  const logout = () => {
    // STEP 1: Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // STEP 2: Clear state
    setToken(null);
    setUser(null);
    setError(null);

    // STEP 3: Navigate to login
    navigate("/login");

    // STEP 4: Show message
    alert("Logged out successfully");
  };

  // ========================================
  // UPDATE USER FUNCTION
  // ========================================
  const updateUser = (updatedUserData) => {
    // Merge updated data with existing user
    const newUser = { ...user, ...updatedUserData };

    // Update state
    setUser(newUser);

    // Update localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
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
  // Using double bang (!!) to cast to boolean
  const isAuthenticated = !!(token && user);
  const isAdmin = !!(user && user.role === "admin");

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
    register,
    login,
    logout,
    updateUser,
    clearError,
  };

  // ========================================
  // RENDER PROVIDER
  // ========================================
  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
