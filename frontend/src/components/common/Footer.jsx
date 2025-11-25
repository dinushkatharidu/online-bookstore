import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        // FOOTER TOP
        <div className="footer-top">
          // ABOUT SECTION
          <div className="footer-section">
            <h3>About BookStore</h3>
            <p>
              Your trusted online bookstore offering thousands of books across
              all genres at competitive prices.
            </p>
          </div>
          // QUICK LINKS
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          // CUSTOMER SERVICE
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li>
                <Link to="/help">Help Center</Link>
              </li>
              <li>
                <Link to="/shipping">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns">Returns</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          // CONTACT INFO
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>📧 support@bookstore.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>📍 123 Book Street, Reading City</p>
          </div>
        </div>
        // FOOTER BOTTOM
        <div className="footer-bottom">
          <p>© {currentYear} Online Bookstore. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span>|</span>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
