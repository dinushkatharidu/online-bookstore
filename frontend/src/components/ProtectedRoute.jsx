import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  // ============================================
  // ACCESS CONTROL LOGIC
  // ============================================

  // STEP 1: If still loading, show loading screen
  if (loading) {
    return <div>Loading...</div>;
  }

  // STEP 2: If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // STEP 3: If admin only route and user is not admin, redirect
  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // STEP 4: User is authorized, render children
  return children;
}

export default ProtectedRoute;