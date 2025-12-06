import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(form.email, form.password);
      if (res.success) {
        navigate("/");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50 mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Login to continue buying or selling books.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors px-3 py-2 mt-2 text-sm font-medium text-white"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-300 hover:text-purple-200 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
