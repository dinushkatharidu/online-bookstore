import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-slate-900 text-slate-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-purple-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-300 mb-6">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved, renamed or deleted.
        </p>
        <Link to="/">
          <button className="rounded-full bg-purple-600 hover:bg-purple-700 px-6 py-2 text-sm font-medium">
            Go back home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
