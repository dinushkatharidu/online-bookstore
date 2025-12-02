import API from "../utils/api";

/**
 * Authentication service handles all auth-related API calls
 */
const authService = {
  /**
   * Register new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise} - { success, token, user }
   */
  register: async (userData) => {
    
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await API.post("/auth/register", userData);

      // Save token and user to localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error
    } 
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - { success, token, user }
   */
  login: async (credentials) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await API.post("/auth/login", credentials);

      // Save token and user to localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  /**
   * Get stored token
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * Get stored user
   */
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  /**
   * Check if user is admin
   */
  isAdmin: () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.role === "admin";
    }
    return false;
  },
};

export default authService;
