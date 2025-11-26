import { useNavigate } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
const Register = () => {
  const { isAuthenticated, login, isLoading } = useAuth();
  const navigate = useNavigate(); // ✅ Add this

  // ✅ Add this: Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = (isAdmin = false) => {
    // Simulate registration process
    // In real app, you'd call API first, then login
    login(isAdmin); // Auto login after successful registration
    // Redirect happens automatically
  };

  return (
    <PageWrapper title="Register for an Account">
      <p className="text-gray-600 mb-4">Create a new account to get started.</p>

      {/* Registration Buttons (simulated) */}
      <div className="space-y-3">
        <button
          onClick={() => handleRegister(false)}
          disabled={isLoading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 shadow-md"
        >
          {isLoading ? "Registering..." : "Register as Standard User"}
        </button>

        <button
          onClick={() => handleRegister(true)}
          disabled={isLoading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 shadow-md"
        >
          {isLoading ? "Registering..." : "Register as Admin"}
        </button>
      </div>

      {/* ✅ Add this: Link to Login */}
      <div className="mt-6 text-center border-t pt-4">
        <p className="text-gray-600">
          Already have an account?{" "}
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline"
          >
            Login here
          </a>
        </p>
      </div>
    </PageWrapper>
  );
};
export default Register;

