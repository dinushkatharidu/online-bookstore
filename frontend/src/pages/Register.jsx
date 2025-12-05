
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await register(
        form.name,
        form.email,
        form.password,
        form.role
      );
      if (res.success) {
        navigate("/");
      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-semibold text-slate-50 mb-1">
          Create an account
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Choose your role as <span className="font-medium">Buyer</span> or{" "}
          <span className="font-medium text-purple-300">Seller</span>.
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
              placeholder="Dinushka Tharidu"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm text-slate-300 mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
            >
              <option value="buyer">Buyer (I want to buy books)</option>
              <option value="seller">Seller (I want to sell books)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors px-3 py-2 mt-2 text-sm font-medium text-white"
          >
            Sign up
          </button>
        </form>

        <p className="text-xs text-slate-400 mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-300 hover:text-purple-200 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
