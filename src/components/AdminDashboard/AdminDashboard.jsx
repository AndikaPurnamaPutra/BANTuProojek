import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Sidebar from './Sidebar';

const StatCard = ({ title, count, colorClass }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
    <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
    <p className={`text-3xl font-normal ${colorClass}`}>{count}</p>
  </div>
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    articles: 0,
    forums: 0,
    portfolios: 0,
    lokers: 0,
    events: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const statsResponse = await api.get('/users/admin/stats');
        setStats(statsResponse.data);

        const profileResponse = await api.get('/users/admin/profile');
        setAdminProfile(profileResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userId');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-xl text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-gray-800">Dashboard Admin</h1>

          <div className="flex items-center space-x-4">
            {adminProfile && (
              <div className="text-gray-700">
                Logged in as:{' '}
                <strong>{adminProfile.username || adminProfile.email}</strong>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Total Users" count={stats.totalUsers} colorClass="text-blue-600" />
          <StatCard title="Total Admins" count={stats.totalAdmins} colorClass="text-purple-600" />
          <StatCard title="Articles" count={stats.articles} colorClass="text-green-600" />
          <StatCard title="Portfolios" count={stats.portfolios} colorClass="text-yellow-600" />
          <StatCard title="Lokers" count={stats.lokers} colorClass="text-red-600" />
          <StatCard title="Events" count={stats.events} colorClass="text-indigo-600" />
          <StatCard title="Forums" count={stats.forums} colorClass="text-pink-600" />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;