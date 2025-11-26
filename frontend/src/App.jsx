import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ========================================
// 1. Authentication Context and Provider Stub
// ========================================

// Context setup
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

/**
 * Mocks the AuthProvider from the pseudocode.
 * In a real application, this would handle Firebase/API authentication logic.
 */
const AuthProvider = ({ children }) => {
  // Mock user state: null for logged out, object for logged in
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [isLoading, setIsLoading] = useState(false); // Simulate loading state

  useEffect(() => {
    // Simple persistence for the mock user
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (isAdmin = false) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser({ id: 101, username: "TestUser", isAdmin });
      setIsLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ========================================
// 2. Component Stubs (Layout, Pages)
// ========================================

/**
 * Universal layout component for navigation and structure.
 */
const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  if (isAuthenticated) {
    navItems.push({ name: "Profile", path: "/profile" });
    if (user?.isAdmin) {
      navItems.push({ name: "Admin Dashboard", path: "/admin/dashboard" });
    }
  } else {
    navItems.push({ name: "Login", path: "/login" });
    navItems.push({ name: "Register", path: "/register" });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-gray-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a
                href="/"
                className="flex-shrink-0 text-white text-xl font-bold rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-700"
              >
                ReactBookApp
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                  >
                    {item.name}
                  </a>
                ))}
                {isAuthenticated && (
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition duration-150 shadow-lg"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>

      <footer className="bg-gray-800 text-gray-400 p-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} ReactBookApp. All rights reserved.
          Routing Demo.
        </p>
      </footer>
    </div>
  );
};

// --- Page Stubs ---

const PageWrapper = ({ title, children }) => (
  <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl transition duration-300 hover:shadow-3xl">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 border-b pb-2">
      {title}
    </h1>
    {children}
  </div>
);

const Home = () => (
  <PageWrapper title="Welcome to the Book App">
    <p className="text-gray-700 text-lg">
      This is the public home page. Feel free to browse!
    </p>
  </PageWrapper>
);

const Login = () => {
  const { isAuthenticated, login, isLoading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <PageWrapper title="User Login">
      <p className="text-gray-600 mb-4">
        Click below to simulate a successful login.
      </p>
      <button
        onClick={() => login(false)}
        disabled={isLoading}
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {isLoading ? "Logging In..." : "Login as Standard User"}
      </button>
      <button
        onClick={() => login(true)}
        disabled={isLoading}
        className="ml-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {isLoading ? "Logging In..." : "Login as Admin"}
      </button>
    </PageWrapper>
  );
};

const Register = () => (
  <PageWrapper title="Register for an Account">
    <p className="text-gray-600">Simulated registration form goes here.</p>
  </PageWrapper>
);

const Profile = () => {
  const { user } = useAuth();
  return (
    <PageWrapper title="My Profile">
      <p className="text-xl font-medium text-indigo-700 mb-2">
        Hello, {user?.username}!
      </p>
      <p className="text-gray-600">
        You are authenticated. This content is protected.
      </p>
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <strong>User ID:</strong> {user?.id}
        <br />
        <strong>Role:</strong>{" "}
        {user?.isAdmin ? "Administrator" : "Standard User"}
      </div>
    </PageWrapper>
  );
};

const NotFound = () => (
  <PageWrapper title="404 - Page Not Found">
    <p className="text-red-500 text-xl font-semibold">
      The requested URL was not found on this server.
    </p>
    <a
      href="/"
      className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
    >
      Go back to Home
    </a>
  </PageWrapper>
);

const AdminDashboard = () => {
  return (
    <div className="bg-red-50 p-6 md:p-10 rounded-xl border-4 border-red-500 shadow-2xl">
      <h1 className="text-4xl font-extrabold text-red-700 mb-4">
        Admin Dashboard
      </h1>
      <p className="text-red-600 text-xl">
        This content is protected and only visible to users with
        <span className="font-bold"> adminOnly=true </span> access.
      </p>
    </div>
  );
};

// ========================================
// 3. ProtectedRoute Component
// ========================================

/**
 * Component used to restrict access to pages based on authentication status.
 * It replaces the content of the <Route/> with a Navigate to /login if the user is not authenticated.
 * It also handles the adminOnly check for privileged routes.
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    // Simple loading indicator while auth is being checked/simulated
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="ml-4 text-indigo-600 font-medium">
            Loading User Session...
          </p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    // Redirect non-authenticated users to the login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Redirect non-admin users if admin access is required
    return <Navigate to="/" replace />; // Or use <NotFound />
  }

  // Render the protected component wrapped in Layout
  // Note: Since Profile and AdminDashboard components are already wrapped in PageWrapper
  // for inner styling, we just render the children here.
  return <Layout>{children}</Layout>;
};

// ========================================
// 4. Main App Component
// ========================================

const App = () => {
  return (
    // BrowserRouter is the standard context for routing
    <BrowserRouter>
      {/* AuthProvider wraps the entire application to provide context */}
      <AuthProvider>
        <Routes>
          {/* ========================================
      DEFAULT ROUTE - LOGIN PAGE (Landing)
      ======================================== */}
          <Route path="/" element={<Login />} />
          {/* ========================================
      PUBLIC ROUTES
      ======================================== */}
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} /> {/* Home moved here */}
          {/* ========================================
      PROTECTED ROUTES (Auth Required)
      ======================================== */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* ========================================
      ADMIN ROUTES (Admin Only)
      ======================================== */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* ========================================
      404 NOT FOUND (Catch all)
      ======================================== */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
