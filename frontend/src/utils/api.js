import axios from "axios";

// Create axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================
API.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // If token exists, add to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================
API.interceptors.response.use(
  (response) => {
    // Return only data part of response
    return response.data;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;

      // Handle 401 - Unauthorized (token expired or invalid)
      if (status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject({
          message: "Session expired. Please login again.",
          status: 401,
        });
      }

      // Handle 403 - Forbidden (insufficient permissions)
      if (status === 403) {
        return Promise.reject({
          message: "You do not have permission to access this resource.",
          status: 403,
        });
      }

      // Handle 404 - Not Found
      if (status === 404) {
        return Promise.reject({
          message: "Resource not found.",
          status: 404,
        });
      }

      // Handle 500 - Server Error
      if (status === 500) {
        return Promise.reject({
          message: "Server error. Please try again later.",
          status: 500,
        });
      }

      // Return API error message or default
      return Promise.reject({
        message: data.message || "An error occurred",
        status,
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: "No response from server.  Please check your connection.",
        status: 0,
      });
    } else {
      // Error in request setup
      return Promise.reject({
        message: error.message || "An error occurred",
        status: 0,
      });
    }
  }
);

export default API;
