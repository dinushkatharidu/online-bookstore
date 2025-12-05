
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const { user, logout, isSeller } = useAuth();
  const { items } = useCart();

  const cartCount = items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <nav className="bg-slate-950 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-lg font-semibold text-slate-50">
            Book<span className="text-purple-400">Hub</span>
          </Link>
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-200">
            Browse
          </Link>
          {isSeller && (
            <Link
              to="/seller"
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Seller dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative text-xs text-slate-300 hover:text-slate-100"
          >
            Cart
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-semibold rounded-full bg-purple-600 text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <span className="text-xs text-slate-400">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="text-xs text-slate-200 border border-slate-600 rounded-lg px-2 py-1 hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-xs text-slate-300 hover:text-slate-100"
              >
                Login
              </Link>
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
