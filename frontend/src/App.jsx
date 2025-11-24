import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Context Provider
import { AuthProvider } from "./context/AuthContext";

// Import Components
import ProtectedRoute from "./components/ProtectedRoute"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    // 1. BrowserRouter handles the history for client-side routing
    <BrowserRouter>
      {/* 2. AuthProvider wraps the entire application to make auth state available globally */}
      <AuthProvider>
        {/* 3. Routes is the container for all Route elements */}
        <Routes>
          {/* ========================================================= */}
          {/* Public Routes: Accessible to everyone */}
          {/* ========================================================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />

          {/* ========================================================= */}
          {/* Protected Routes: Requires isAuthenticated = true */}
          {/* These routes use the ProtectedRoute wrapper */}
          {/* ========================================================= */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ========================================================= */}
          {/* Admin Only Route: Requires isAuthenticated = true AND isAdmin = true */}
          {/* The adminOnly prop is passed to the ProtectedRoute component */}
          {/* ========================================================= */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* ========================================================= */}
          {/* Fallback Route: Matches any unmatched path (404 Not Found) */}
          {/* ========================================================= */}
          <Route
            path="*"
            element={
              <div style={{ padding: "20px", textAlign: "center" }}>
                <h1>404</h1>
                <p>Page Not Found</p>
                <Link to="/">Go Home</Link>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
