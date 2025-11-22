import axois from "axios";

// ============================================
// CREATE AXIOS INSTANCE
// ============================================

const API = axois.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return modified config
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

API.interceptors.response.use(
  (response) => {
    // ON SUCCESS: Return direct data (stripping the axios container)
    return response.data;
  },
  (error) => {
    let message = "An error occurred";
    let status = null;

    // Check if error has response
    if (error.response) {
      status = error.response.status;
      // Get message from backend or fallback
      message = error.response.data?.message || "An error occurred";

      // Handle specific status codes
      switch (status) {
        case 401:
          // Unauthorized - token invalid or expired
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          message = "Session expired. Please login again";

          // Redirect logic (using window.location because hooks won't work here)
          window.location.href = "/login";
          break;

        case 403:
          message = "You don't have permission to access this resource";
          break;

        case 404:
          message = "Resource not found";
          break;

        case 500:
          message = "Server error. Please try again later";
          break;

        default:
          break;
      }
    } else {
      // Network error
      message = "Network error. Please check your connection";
    }

    // Show error message
    console.error(`API Error: ${message}`);

    //  Return error
    return Promise.reject({ message, status });
  }
);

// ============================================
// API METHODS
// ============================================
export const authAPI = {
  register: (userData) => {
    // userData = { name, email, password }
    return API.post("/auth/register", userData);
  },

  login: (userData) => {
    // userData = { email, password }
    return API.post("/auth/login", userData);
  },

  getProfile: () => {
    return API.get("/users/profile");
  },
};

// Export the instance in case you need raw access elsewhere
export default API;
