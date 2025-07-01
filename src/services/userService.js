import api from './api';

export const register = (formData) => {
  return api.post('/users/register', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const login = (emailOrUsername, password) => {
  return api.post('/users/login', { emailOrUsername, password });
};

export const getProfile = () => {
  return api.get('/users/profile');
};

export const getUserById = (id) => {
  return api.get(`/users/${id}`, { headers: { 'No-Auth': true } });
};
