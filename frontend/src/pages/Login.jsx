import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/common/Layout";
import ErrorAlert from "../components/common/ErrorAlert";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin, loading, error, clearError } =
    useAuth();

  // Form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) navigate("/admin/dashboard");
      else navigate("/");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setLocalError("");
  };

  // Basic validation
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setLocalError("Email and password are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setLocalError("Please enter a valid email");
      return false;
    }

    return true;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData);
    } catch (err) {
      setLocalError(err.message || "Login failed");
    }
  };

  return (
    <Layout>
      {/* Page wrapper: Purple Dark UI */}
      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
        {/* Centered container */}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen">
          {/* Logo + Brand */}
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-slate-50"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            Local Book Exchange
          </Link>

          {/* Auth card */}
          <div className="w-full rounded-xl border border-slate-800 bg-slate-900/80 backdrop-blur shadow-lg shadow-purple-900/30 sm:max-w-md p-6 md:p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2 text-center">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-50">
                Sign in to your account
              </h1>
              <p className="text-sm text-slate-400">
                Welcome back! Please login to continue.
              </p>
            </div>

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

            {/* Login Form */}
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-slate-200"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="block w-full rounded-lg border border-slate-700 bg-slate-900
                             p-2.5 text-sm text-slate-50 placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600
                             disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-purple-400 hover:text-purple-300 hover:underline"
                    onClick={() => {
                      // later: navigate("/forgot-password");
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-slate-700 bg-slate-900
                             p-2.5 text-sm text-slate-50 placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600
                             disabled:opacity-70 disabled:cursor-not-allowed"
                />
              </div>

              {/* Submit Button – Primary purple */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center
                           rounded-lg border border-purple-500/60
                           bg-purple-600 px-5 py-2.5 text-sm font-medium text-white
                           shadow-lg shadow-purple-900/40
                           hover:bg-purple-700 hover:border-purple-400
                           focus:outline-none focus:ring-2 focus:ring-purple-500
                           focus:ring-offset-2 focus:ring-offset-slate-950
                           disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              {/* Divider (optional, but matches theme utils) */}
              {/* 
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="h-px flex-1 bg-slate-800" />
                <span className="shrink-0 uppercase tracking-wide">or</span>
                <span className="h-px flex-1 bg-slate-800" />
              </div>
              */}

              {/* Register Link */}
              <p className="text-sm text-slate-400 text-center">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-purple-300 hover:text-purple-200 hover:underline"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
