import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Assume BookCard component is defined elsewhere (Phase 2)
// import BookCard from './BookCard';

const Home = () => {
  // ========================================
  // STATE
  // ========================================
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get auth state
  const { user, isAuthenticated } = useAuth();

  // ========================================
  // FETCH FEATURED BOOKS (will implement later in Phase 2)
  // ========================================
  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true);
        // For now, we'll just set empty array
        // Later: const response = await bookAPI.getFeatured();
        // setFeaturedBooks(response.data);
        setFeaturedBooks([]);
      } catch (error) {
        console.error("Error fetching featured books:", error);
        // Display error message (e.g., using a toast or state)
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []); // Empty dependency array means this runs once on mount

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Online Bookstore</h1>

          {/* Conditional Greeting */}
          {isAuthenticated ? (
            <p>Hello, {user.name}! Discover your next great read.</p>
          ) : (
            <p>Discover thousands of books at great prices</p>
          )}

          <div className="hero-buttons">
            {/* Conditional Call to Action */}
            {isAuthenticated ? (
              <Link to="/shop">
                <button className="btn btn-primary">Browse Books</button>
              </Link>
            ) : (
              <Link to="/register">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📚</span>
            <h3>Vast Collection</h3>
            <p>Thousands of books across all genres</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Best Prices</h3>
            <p>Competitive prices and great deals</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🚚</span>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">⭐</span>
            <h3>Customer Reviews</h3>
            <p>Read reviews from verified buyers</p>
          </div>
        </div>
      </section>

      {/* FEATURED BOOKS SECTION (will populate later) */}
      <section className="featured-books">
        <h2>Featured Books</h2>

        {/* Conditional Rendering based on loading/data */}
        {loading ? (
          <div className="loading-message">Loading books...</div>
        ) : featuredBooks.length === 0 ? (
          <div className="no-books-message">
            <p>Books coming soon!</p>
            {/* Admin-specific CTA */}
            {isAuthenticated && user.role === "admin" && (
              <Link to="/admin/books">
                <button className="btn btn-secondary">Add Books</button>
              </Link>
            )}
          </div>
        ) : (
          <div className="books-grid">
            {/* Map over books and render BookCard (assuming it's available) */}
            {/* featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            )) */}
            {/* Placeholder for future book cards */}
            <div>Book Card Placeholder 1</div>
            <div>Book Card Placeholder 2</div>
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <section className="cta">
        <h2>Start Your Reading Journey Today</h2>
        {/* Conditional CTA */}
        {isAuthenticated ? (
          <Link to="/shop">
            <button className="btn btn-primary">Explore Books</button>
          </Link>
        ) : (
          <Link to="/register">
            <button className="btn btn-primary">Create Free Account</button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default Home;
