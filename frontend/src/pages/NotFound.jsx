import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="card text-center max-w-md">
          <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, the page you're looking for doesn't exist. It might have been
            moved or deleted.
          </p>
          <Link to="/">
            <button className="btn-primary">Go Back Home</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
