import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/common/Layout";

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to BookStore
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {isAuthenticated
              ? `Welcome back, ${user?.name}!  Discover your next great read.`
              : "Discover thousands of books at unbeatable prices"}
          </p>

          {!isAuthenticated && (
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-primary-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-900 transition border-2 border-white">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">Vast Collection</h3>
            <p className="text-gray-600">
              Thousands of books across all genres
            </p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Best Prices</h3>
            <p className="text-gray-600">Competitive pricing and great deals</p>
          </div>

          <div className="card text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable shipping</p>
          </div>
        </div>

        {/* CTA Section */}
        {isAuthenticated && (
          <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
            <p className="text-gray-600 mb-6">
              Browse our collection and find your next favorite book
            </p>
            <Link to="/shop">
              <button className="btn-primary">Browse Books</button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
