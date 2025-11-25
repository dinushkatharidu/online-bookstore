import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";

function NotFound() {
  return (
    <Layout>
      <div className="not-found-page">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Oops! The page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>

          <Link to="/">
            <button className="btn-primary">Go Back Home</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;