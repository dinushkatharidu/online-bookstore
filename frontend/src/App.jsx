import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import "./index.css";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import SellerDashboard from "./pages/SellerDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import Browse from "./pages/Browse";


const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-900 text-slate-50">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public landing page */}
                <Route path="/" element={<Landing />} />

                {/* Browsing page (old Home) */}
                <Route path="/browse" element={<Browse />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Cart – only buyers */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute allowedRoles={["buyer"]}>
                      <Cart />
                    </ProtectedRoute>
                  }
                />

                {/* Seller dashboard */}
                <Route
                  path="/seller"
                  element={
                    <ProtectedRoute allowedRoles={["seller"]}>
                      <SellerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
