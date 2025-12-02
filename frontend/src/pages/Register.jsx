import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/common/Layout";
import ErrorAlert from "../components/common/ErrorAlert";

const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading, error, clearError } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    acceptTerms: false,
  });

  const [localError, setLocalError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Handle input change (supports checkbox)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setLocalError("");
  };

  // Validate form based on backend rules
  const validateForm = () => {
    const { name, email, password, confirmPassword, phone, acceptTerms } =
      formData;

    // Required fields
    if (!name || !email || !password || !confirmPassword) {
      setLocalError("Please fill all required fields");
      return false;
    }

    if (name.length < 3) {
      setLocalError("Name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return false;
    }

    // Phone is optional, but if provided must match backend regex
    if (phone) {
      const phoneRegex = /^[0-9]{10,15}$/;
      if (!phoneRegex.test(phone)) {
        setLocalError("Phone number must be 10 to 15 digits");
        return false;
      }
    }

    if (!acceptTerms) {
      setLocalError("You must accept the Terms and Conditions");
      return false;
    }

    return true;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email.toLowerCase(),
        password: formData.password,
        phone: formData.phone || undefined,
        address: {
          street: formData.street || undefined,
          city: formData.city || undefined,
          state: formData.state || undefined,
          zipcode: formData.zipcode || undefined,
          country: formData.country || undefined,
        },
      });

      navigate("/");
    } catch (err) {
      setLocalError(err.message || "Registration failed");
    }
  };

  return (
    <Layout>
      {/* Background with subtle purple gradient */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950 " >
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen lg:py-0 ">
          {/* Logo + Brand */}
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-purple-700 dark:text-purple-300"
          >
            <img
              className="w-9 h-9 mr-2 rounded-xl shadow-sm ring-2 ring-purple-200 dark:ring-purple-500"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            <span className="tracking-tight">Local Book Exchange</span>
          </Link>

          {/* Card */}
          <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl dark:border dark:border-gray-700 md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                Create an account
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join the community and start exchanging books with others.
              </p>

              {/* Error Messages */}
              {(error || localError) && (
                <ErrorAlert
                  message={error || localError}
                  onClose={() => {
                    setLocalError("");
                    clearError();
                  }}
                />
              )}

              {/* Register Form */}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                               dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                               dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>

                {/* Phone (optional) */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone (optional)
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="0712345678"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                               dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    10–15 digits, numbers only.
                  </p>
                </div>

                {/* Address fields (optional) */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="street"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Street (optional)
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      placeholder="123 Main Street"
                      value={formData.street}
                      onChange={handleChange}
                      disabled={loading}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                                 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                                 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City (optional)
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="Colombo"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={loading}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                                 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                                 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      State/Province (optional)
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="Western Province"
                      value={formData.state}
                      onChange={handleChange}
                      disabled={loading}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                                 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                                 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zipcode"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Zip code (optional)
                    </label>
                    <input
                      type="text"
                      name="zipcode"
                      id="zipcode"
                      placeholder="10200"
                      value={formData.zipcode}
                      onChange={handleChange}
                      disabled={loading}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                                 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                                 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Country (optional)
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      placeholder="Sri Lanka"
                      value={formData.country}
                      onChange={handleChange}
                      disabled={loading}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                                 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                                 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                               dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                               focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5
                               dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="acceptTerms"
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      disabled={loading}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50
                                 focus:ring-2 focus:ring-purple-400 dark:bg-gray-800
                                 dark:border-gray-600 dark:focus:ring-purple-500
                                 dark:ring-offset-gray-900"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        href="#"
                        className="font-medium text-purple-600 hover:text-purple-700 hover:underline dark:text-purple-400"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-purple-600 hover:bg-purple-700
                             focus:ring-4 focus:outline-none focus:ring-purple-300
                             font-medium rounded-lg text-sm px-5 py-2.5 text-center
                             dark:bg-purple-600 dark:hover:bg-purple-700
                             dark:focus:ring-purple-900 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? "Creating account..." : "Create an account"}
                </button>

                {/* Login link */}
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-purple-600 hover:text-purple-700 hover:underline dark:text-purple-400"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
