import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/common/Layout";
import SuccessAlert from "../components/common/SuccessAlert";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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

  // ✅ FIXED: Only update if user data actually changed
  useEffect(() => {
    if (user) {
      // Create a function to avoid setting state directly
      const updateFormData = () => {
        setFormData({
          name: user.name || "",
          phone: user.phone || "",
          address: user.address || {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
        });
      };

      // Call the function only once when user changes
      updateFormData();
    }
  }, [user?.email]); 

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address. ")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // TODO: Call API to save profile
    setSuccessMessage("Profile updated successfully! ");
    setIsEditing(false);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>

          {successMessage && (
            <SuccessAlert
              message={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Email (Read-only) */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                value={user?.email || ""}
                className="input-field bg-gray-100 cursor-not-allowed"
                disabled
              />
              <p className="text-sm text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              ) : (
                <p className="text-gray-700">{user?.name}</p>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter phone number"
                />
              ) : (
                <p className="text-gray-700">{user?.phone || "Not provided"}</p>
              )}
            </div>

            {/* Address Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4">Address</h3>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address. street"
                    value={formData.address.street}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="123 Main Street"
                  />
                ) : (
                  <p className="text-gray-700">
                    {formData.address.street || "Not provided"}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address. city"
                      value={formData.address.city}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-700">
                      {formData.address.city || "Not provided"}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-700">
                      {formData.address.state || "Not provided"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Zip Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address.zipCode"
                      value={formData.address.zipCode}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-700">
                      {formData.address.zipCode || "Not provided"}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address. country"
                      value={formData.address.country}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="text-gray-700">
                      {formData.address.country || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-6 border-t">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
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
};

export default Profile;
