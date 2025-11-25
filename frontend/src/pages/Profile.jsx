import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";
// Assuming you have a utility function for date formatting
import { formatDate } from "../utils/helpers";
// Assuming you have API functions for Phase 6 implementation
// import * as userAPI from '../api/userApi';

/**
 * A component to display and allow editing of the user's profile details.
 * It uses the AuthContext to get and update user data.
 * @returns {JSX.Element} The Profile component.
 */
function Profile() {
  // ========================================
  // HOOKS & STATE
  // ========================================
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Get auth state and update function
  const { user, updateUser } = useAuth();

  // ========================================
  // POPULATE FORM WITH USER DATA
  // Runs on mount and whenever the 'user' object from context changes
  // ========================================
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
        },
      });
    }
  }, [user]);

  // ========================================
  // HANDLE INPUT CHANGE
  // Handles changes for both top-level fields (name, phone) and nested address fields
  // ========================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("address.")) {
      // Handle nested address fields
      const addressField = name.split(".")[1]; // extract field name after "address."
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      // Handle top-level fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // ========================================
  // ENABLE EDIT MODE
  // ========================================
  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(null);
  };

  // ========================================
  // CANCEL EDIT
  // Resets form data back to the current user state
  // ========================================
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original user data (re-run logic from useEffect)
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          zipCode: user.address?.zipCode || "",
          country: user.address?.country || "",
        },
      });
    }
  };

  // ========================================
  // SAVE CHANGES
  // ========================================
  const handleSave = async (event) => {
    event.preventDefault(); // PREVENT default form submission

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      // TODO: Call API to update profile (Phase 6)
      // const response = await userAPI.updateProfile(formData);

      // For now, just update context (Simulating success)
      updateUser(formData);

      setSuccess("Profile updated successfully! ✅");
      setIsEditing(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      // Assuming the API throws an error object
      setError(err.message || "Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  // Helper for rendering address or placeholder text
  const renderAddressField = (field) => user.address?.[field] || "Not provided";

  // Safety check: if user is null (e.g., fetching or not logged in), show a loading state or redirect
  if (!user) {
    return (
      <Layout>
        <div className="profile-loading">Loading profile...</div>
      </Layout>
    );
  }

  // ========================================
  // RENDER
  // ========================================
  return (
    <Layout>
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <h1>My Profile</h1>

            {!isEditing && (
              <button onClick={handleEdit} className="btn-edit">
                Edit Profile
              </button>
            )}
          </div>

          {/* SUCCESS MESSAGE */}
          {success && <div className="alert-success">{success}</div>}

          {/* ERROR MESSAGE */}
          {error && <div className="alert-error">{error}</div>}

          {/* PROFILE INFO */}
          <div className="profile-info">
            {/* EMAIL (Read-only) */}
            <div className="info-row">
              <label>Email</label>
              <p className="read-only-value">{user.email}</p>
              <small>Email cannot be changed</small>
            </div>

            {/* ROLE (Read-only) */}
            <div className="info-row">
              <label>Role</label>
              <p className="read-only-value">
                {user.role === "admin" ? "Administrator" : "Customer"}
              </p>
            </div>

            {/* MEMBER SINCE (Read-only) */}
            <div className="info-row">
              <label>Member Since</label>
              <p className="read-only-value">{formatDate(user.createdAt)}</p>
            </div>
          </div>

          <hr className="divider" />

          {/* EDITABLE FORM (Conditional rendering of inputs/paragraphs) */}
          <form onSubmit={handleSave}>
            {/* NAME */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              {isEditing ? (
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              ) : (
                <p>{user.name || "Not provided"}</p>
              )}
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              {isEditing ? (
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              ) : (
                <p>{user.phone || "Not provided"}</p>
              )}
            </div>

            {/* ADDRESS SECTION */}
            <div className="address-section">
              <h3>Shipping Address</h3>

              {/* Street */}
              <div className="form-group">
                <label htmlFor="address.street">Street Address</label>
                {isEditing ? (
                  <input
                    id="address.street"
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                  />
                ) : (
                  <p>{renderAddressField("street")}</p>
                )}
              </div>

              {/* City & State (side by side container - assume form-row is styled with flex/grid) */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address.city">City</label>
                  {isEditing ? (
                    <input
                      id="address.city"
                      type="text"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{renderAddressField("city")}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address.state">State</label>
                  {isEditing ? (
                    <input
                      id="address.state"
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{renderAddressField("state")}</p>
                  )}
                </div>
              </div>

              {/* Zip Code & Country (side by side container) */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address.zipCode">Zip Code</label>
                  {isEditing ? (
                    <input
                      id="address.zipCode"
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{renderAddressField("zipCode")}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="address.country">Country</label>
                  {isEditing ? (
                    <input
                      id="address.country"
                      type="text"
                      name="address.country"
                      value={formData.address.country}
                      onChange={handleChange}
                    />
                  ) : (
                    <p>{renderAddressField("country")}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (only shown when editing) */}
            {isEditing && (
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
