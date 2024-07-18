import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white w-64 p-4">
      <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
      <nav className="space-y-4">
        <Link to="/admin/dashboard" className="block text-lg hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/admin/manage-vehicles" className="block text-lg hover:bg-gray-700 p-2 rounded">Manage Vehicles</Link>
        <Link to="/admin/manage-users" className="block text-lg hover:bg-gray-700 p-2 rounded">Manage Users</Link>
        <Link to="/admin/reports" className="block text-lg hover:bg-gray-700 p-2 rounded">Reports</Link>
        <Link to="/admin/locations" className="block text-lg hover:bg-gray-700 p-2 rounded">Locations and Branches</Link>
        <Link to="/admin/support-tickets" className="block text-lg hover:bg-gray-700 p-2 rounded">Customer Support Tickets</Link>
        <Link to="/admin/fleet-management" className="block text-lg hover:bg-gray-700 p-2 rounded">Fleet Management</Link>
        <Link to="/admin/settings" className="block text-lg hover:bg-gray-700 p-2 rounded">Settings</Link>
        <Link to="/admin/logout" className="block text-lg hover:bg-gray-700 p-2 rounded">Logout</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;