import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, user, login, isLoading } = useAuth();
  const navigate = useNavigate(); // ✅ Add this import at top

  // ✅ Add this: Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (isAdmin) => {
    login(isAdmin);
    // After login, redirect happens automatically via useEffect above
  };

  return (
    <PageWrapper title="User Login">
      <p className="text-gray-600 mb-4">Welcome! Please login to continue.</p>

      {/* Login Buttons */}
      <div className="space-y-3">
        <button
          onClick={() => handleLogin(false)}
          disabled={isLoading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isLoading ? "Logging In..." : "Login as Standard User"}
        </button>

        <button
          onClick={() => handleLogin(true)}
          disabled={isLoading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isLoading ? "Logging In..." : "Login as Admin"}
        </button>
      </div>

      {/* ✅ Add this: Link to Register */}
      <div className="mt-6 text-center border-t pt-4">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
          >
            Register here
          </a>
        </p>
      </div>
    </PageWrapper>
  );
};

export default Login;