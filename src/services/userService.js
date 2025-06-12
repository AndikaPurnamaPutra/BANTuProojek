import api from './api';

export const register = (formData) => {
  return api.post('/users/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const login = (email, password) => {
  return api.post('/users/login', { email, password });
};

// Ambil data profil user yang sedang login (token otomatis dipakai)
export const getProfile = () => {
  return api.get('/users/profile');
};

// Ambil data user berdasarkan id → PUBLIC REQUEST → tanpa token
export const getUserById = (id) => {
  return api.get(`/users/${id}`, { headers: { 'No-Auth': true } });
};
