import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout, isSeller } = useAuth();
  const { items } = useCart();
  const location = useLocation();

  const cartCount = items.reduce((sum, it) => sum + (it.quantity || 0), 0);

  const linkClass = ({ isActive }) =>
    `text-xs transition ${
      isActive ? "text-slate-50" : "text-slate-400 hover:text-slate-200"
    }`;

  const isOnAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <nav className="bg-slate-950/95 backdrop-blur border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold text-slate-50">
            Book<span className="text-purple-400">Hub</span>
          </Link>

          {/* Public links */}
          <div className="hidden sm:flex items-center gap-3">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>

            {/* Browse link (you can point this to your browsing page route if different) */}
            <NavLink to="/browse" className={linkClass}>
              Browse
            </NavLink>

            {/* Seller only */}
            {user && isSeller && (
              <NavLink to="/seller" className={linkClass}>
                Seller dashboard
              </NavLink>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Cart: ONLY after login AND only for non-seller */}
          {user && !isSeller && (
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative text-xs transition ${
                  isActive
                    ? "text-slate-50"
                    : "text-slate-300 hover:text-slate-100"
                }`
              }
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-semibold rounded-full bg-purple-600 text-white">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

          {/* Auth area */}
          {user ? (
            <>
              <span className="hidden md:inline text-xs text-slate-400">
                {user?.name}{" "}
                <span className="text-slate-500">({user?.role})</span>
              </span>

              <button
                onClick={logout}
                className="text-xs text-slate-200 border border-slate-700 rounded-lg px-3 py-1 hover:bg-slate-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {!isOnAuthPage && (
                <NavLink to="/login" className={linkClass}>
                  Login
                </NavLink>
              )}
              <Link
                to="/register"
                className="text-xs bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-3 py-1"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
