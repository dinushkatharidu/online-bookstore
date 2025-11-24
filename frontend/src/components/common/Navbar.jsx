import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  // ========================================
  // STATE
  // ========================================
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get auth state and navigation hook
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // ========================================
  // TOGGLE MOBILE MENU
  // ========================================
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // ========================================
  // HANDLE LOGOUT
  // ========================================
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false); // Close mobile menu IF open
    navigate("/"); // Optional: Redirect to home or login page after logout
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO/BRAND */}
        <Link to="/" className="nav-logo">
          <span>📚 BookStore</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="nav-menu desktop-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/shop" className="nav-link">
            Shop
          </Link>

          {/* Conditional Links based on Authentication */}
          {isAuthenticated ? (
            <>
              {/* Customer links */}
              <Link to="/cart" className="nav-link nav-cart-icon">
                🛒 Cart
                {/* TODO: Add cart count badge in Phase 4 */}
              </Link>

              <Link to="/orders" className="nav-link">
                Orders
              </Link>

              {/* Admin link */}
              {isAdmin && (
                <Link to="/admin/dashboard" className="nav-link nav-admin-link">
                  Admin
                </Link>
              )}

              {/* User dropdown/menu */}
              {/* Note: In a real app, this would require additional state/logic for the dropdown to open */}
              <div className="user-menu-container">
                <button className="user-button">
                  👤 {user?.name || "User"}
                </button>

                <div className="dropdown-menu">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/orders">My Orders</Link>
                  <button
                    onClick={handleLogout}
                    className="dropdown-logout-btn"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Guest links */}
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                <button className="btn btn-primary">Register</button>
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button className="mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU (shown when mobileMenuOpen is true) */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/shop" onClick={toggleMobileMenu}>
            Shop
          </Link>

          {/* Conditional Mobile Links */}
          {isAuthenticated ? (
            <>
              <Link to="/cart" onClick={toggleMobileMenu}>
                Cart
              </Link>
              <Link to="/orders" onClick={toggleMobileMenu}>
                Orders
              </Link>
              <Link to="/profile" onClick={toggleMobileMenu}>
                Profile
              </Link>

              {isAdmin && (
                <Link to="/admin/dashboard" onClick={toggleMobileMenu}>
                  Admin Dashboard
                </Link>
              )}

              <button onClick={handleLogout} className="mobile-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMobileMenu}>
                Login
              </Link>
              <Link to="/register" onClick={toggleMobileMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
