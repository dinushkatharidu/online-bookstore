import { useAuth } from "../../hooks/useAuth";
import Layout from "../../components/common/Layout";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="card bg-gradient-to-r from-red-600 to-red-800 text-white">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-red-100">
            Welcome, {user?.name}! Manage your bookstore here.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card">
            <div className="text-gray-500 text-sm font-semibold mb-2">
              Total Books
            </div>
            <div className="text-4xl font-bold text-primary-600">0</div>
          </div>

          <div className="card">
            <div className="text-gray-500 text-sm font-semibold mb-2">
              Total Orders
            </div>
            <div className="text-4xl font-bold text-primary-600">0</div>
          </div>

          <div className="card">
            <div className="text-gray-500 text-sm font-semibold mb-2">
              Total Users
            </div>
            <div className="text-4xl font-bold text-primary-600">0</div>
          </div>

          <div className="card">
            <div className="text-gray-500 text-sm font-semibold mb-2">
              Revenue
            </div>
            <div className="text-4xl font-bold text-green-600">$0</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-bold mb-4">Manage Books</h3>
            <p className="text-gray-600 mb-4">
              Add, edit, or delete books from inventory
            </p>
            <button className="btn-primary w-full">Go to Books</button>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">Manage Orders</h3>
            <p className="text-gray-600 mb-4">View and update order statuses</p>
            <button className="btn-primary w-full">Go to Orders</button>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4">Manage Users</h3>
            <p className="text-gray-600 mb-4">View all registered users</p>
            <button className="btn-primary w-full">Go to Users</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
