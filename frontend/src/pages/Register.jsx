import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  // ========================================
  // STATE FOR FORM DATA
  // ========================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Get auth functions from context
  const { register, error: authError, loading } = useAuth();

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...FormData,
      [name]: value,
    });

    // Clear error for this field if user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  // ========================================
  // VALIDATE FORM
  // ========================================

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name
    if (!formData.name) {
      errors.name = "Name is required";
    } else if (formData.name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    // Validate email
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    // Validate password
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);

    // Return true if errors object is empty
    return Object.keys(errors).length === 0;
  };

  // ========================================
  // HANDLE FORM SUBMIT
  // ========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    //  Validate form
    if (!validateForm()) {
      return;
    }

    // Prepare data (exclude confirmPassword)
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    };

    //  Call register function from context
    
    await register(userData);
  };

  // ========================================
  // RENDER FORM
  // ========================================
  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Create Account</h2>

        {/* Display Global Auth Error (e.g., "Email already exists") */}
        {authError && (
          <div className="alert alert-danger" style={{ color: 'red', marginBottom: '1rem' }}>
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className={formErrors.name ? "error" : ""}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {formErrors.name && <span style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.name}</span>}
          </div>

          {/* Email Input */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={formErrors.email ? "error" : ""}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {formErrors.email && <span style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className={formErrors.password ? "error" : ""}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
            {formErrors.password && <span style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.password}</span>}
          </div>

          {/* Confirm Password Input */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={formErrors.confirmPassword ? "error" : ""}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />
            {formErrors.confirmPassword && <span style={{ color: 'red', fontSize: '0.8rem' }}>{formErrors.confirmPassword}</span>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

