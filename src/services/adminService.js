import api from './api';

// Ambil profil admin yang sedang login (token otomatis dipakai)
export const getAdminProfile = () => {
  return api.get('/admin/profile');
};

// Contoh lain kalau mau tambah service admin seperti:
// export const getAdminStats = () => api.get('/admin/stats');
// export const getUsers = () => api.get('/admin/users');
