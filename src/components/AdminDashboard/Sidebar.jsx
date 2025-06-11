import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // Fungsi untuk cek active link
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'Manage Portfolios', to: '/admin/portfolios' },
    { label: 'Manage Users', to: '/admin/users' },
    { label: 'Manage Articles', to: '/admin/articles' },
    { label: 'Manage Jobs', to: '/admin/jobs' },
    { label: 'Manage Forum', to: '/admin/forums' },
    { label: 'Manage Events', to: '/admin/events' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-medium mb-10">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-4">
          {menuItems.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`block px-4 py-2 rounded hover:bg-gray-700 transition-colors ${
                  isActive(to) ? 'bg-gray-700 font-medium' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
