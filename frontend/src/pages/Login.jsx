import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  // ========================================
  // STATE FOR FORM DATA
  // ========================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Get auth functions from context
  const { loging, loading } = useAuth();

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    // 1. Update form data state
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // 2. Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        [name]: "",
      }));
    }
  };

  // ========================================
  // VALIDATE FORM
  // ========================================

  const validateForm = () => {
    const errors = {};

    // Validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    }

    // Validate password
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);

    // Return true if the errors object is empty
    return Object.keys(errors).length === 0;
  };

  // ========================================
  // HANDLE FORM SUBMIT
  // ========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    // STEP 1: Validate form
    if (!validateForm()) {
      return;
    }

    // STEP 2: Call login function from context
    loging(formData);
  };

  // ========================================
  // RENDER FORM
  // ========================================

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Login to Your Account</h2>
        IF error exists THEN: DISPLAY error message in alert box END IF
        <form onSubmit={handleSubmit}>
          // Email Input
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            IF formErrors.email exists THEN: DISPLAY formErrors.email END IF
          </div>
          // Password Input
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            IF formErrors.password exists THEN: DISPLAY formErrors.password END
            IF
          </div>
          // Submit Button
          <button type="submit" disabled={loading}>
            IF loading THEN: DISPLAY "Logging in..." ELSE: DISPLAY "Login" END
            IF
          </button>
        </form>
        <p>
          Don't have an account?
          <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
