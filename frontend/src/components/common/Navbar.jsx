import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    // Background: Slate-950 with 90% opacity and blur for a modern "glass" feel
    // Border: Slate-800 to separate from page content
    <nav className="bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              📚
            </span>
            <span className="text-xl font-bold text-white tracking-tight">
              Local<span className="text-purple-500">Book</span>Exchange
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/profile"
                  className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors"
                >
                  Profile
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    // distinct color for Admin to prevent accidental clicks
                    className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors border border-red-400/20 bg-red-400/10 px-3 py-1 rounded-full"
                  >
                    Admin Panel
                  </Link>
                )}

                {/* User Section Divider */}
                <div className="h-6 w-px bg-slate-700 mx-2"></div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400">
                    Hi,{" "}
                    <span className="text-white font-medium">{user?.name}</span>
                  </span>

                  {/* Logout Button: Ghost style (red accent) */}
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              // Guest View
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link to="/register">
                  <button className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 transition-all shadow-lg shadow-purple-900/20">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
