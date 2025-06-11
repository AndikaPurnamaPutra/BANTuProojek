import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ManageUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    username: '',
    email: '',
    role: '',
    password: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal mengambil data user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm('Yakin ingin menghapus user ini?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers();
      alert('User berhasil dihapus');
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menghapus user');
    }
  };

  const handleResetPassword = async (userId) => {
    if (!window.confirm('Reset password user ke default "12345678"?')) return;
    try {
      await api.put(`/admin/users/${userId}`, { password: '12345678' });
      alert('Password user berhasil di-reset');
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal reset password');
    }
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({
      firstName: user.firstName || '',
      username: user.username,
      email: user.email,
      role: user.role,
      password: '',
    });
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditUser(null);
    setFormData({
      firstName: '',
      username: '',
      email: '',
      role: '',
      password: '',
    });
  };

  const openAddModal = () => {
    setFormData({
      firstName: '',
      username: '',
      email: '',
      role: 'designer',
      password: '',
    });
    setIsAdding(true);
  };

  const closeAddModal = () => {
    setIsAdding(false);
    setFormData({
      firstName: '',
      username: '',
      email: '',
      role: '',
      password: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/admin/users/${editUser._id}`, formData);
      fetchUsers();
      alert('User berhasil diupdate');
      closeEditModal();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal mengupdate user');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/users', formData);
      fetchUsers();
      alert('User berhasil ditambahkan');
      closeAddModal();
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menambahkan user');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.firstName &&
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-manage-users flex flex-col items-end p-6">
      <div className="flex justify-between items-center mb-6 w-full">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-medium text-gray-800">Manage Users</h1>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add User
        </button>
      </div>

      <input
        type="text"
        placeholder="Search username, first name, or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 w-full p-2 border rounded"
      />

      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b">First Name</th>
            <th className="py-3 px-6 border-b">Username</th>
            <th className="py-3 px-6 border-b">Email</th>
            <th className="py-3 px-6 border-b">Role</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="py-3 px-6 border-b">{user.firstName || '-'}</td>
              <td className="py-3 px-6 border-b">{user.username}</td>
              <td className="py-3 px-6 border-b">{user.email}</td>
              <td className="py-3 px-6 border-b">{user.role}</td>
              <td className="py-3 px-6 border-b space-x-4">
                <button
                  onClick={() => openEditModal(user)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                {/* <button
                  onClick={() => handleResetPassword(user._id)}
                  className="text-yellow-600 hover:text-yellow-800"
                >
                  Reset Password
                </button> */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <Modal
          title="Edit User"
          onClose={closeEditModal}
          onSubmit={handleUpdateUser}
        >
          <UserForm
            formData={formData}
            onChange={handleInputChange}
            showPassword={false}
          />
        </Modal>
      )}

      {isAdding && (
        <Modal
          title="Add New User"
          onClose={closeAddModal}
          onSubmit={handleAddUser}
        >
          <UserForm
            formData={formData}
            onChange={handleInputChange}
            showPassword={true}
          />
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose, onSubmit }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-96"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);

const UserForm = ({ formData, onChange, showPassword }) => (
  <>
    <div>
      <label className="block mb-1">First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
    </div>
    <div>
      <label className="block mb-1">Username</label>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
    </div>
    <div>
      <label className="block mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
    </div>
    <div>
      <label className="block mb-1">Role</label>
      <select
        name="role"
        value={formData.role}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded"
      >
        <option value="designer">Designer</option>
        <option value="artisan">Artisan</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    {showPassword && (
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
          className="w-full border px-3 py-2 rounded"
          placeholder="Minimal 6 karakter"
        />
      </div>
    )}
  </>
);

export default ManageUsers;
