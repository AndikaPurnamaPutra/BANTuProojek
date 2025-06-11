// # API untuk Portfolio
import api from './api';

// Upload portfolio (sudah ada)
const uploadPortfolio = async (formData) => {
  try {
    const response = await api.post('/portfolios', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading portfolio:', error.response?.data || error);
    throw error;
  }
};

// Toggle like portfolio
const toggleLikePortfolio = async (portfolioId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('User is not authenticated');

    const response = await api.put(`/portfolios/${portfolioId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error toggling like:', error.response?.data || error);
    throw error;
  }
};

// Get all portfolios with optional auth token (recommended)
const getAllPortfolios = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await api.get('/portfolios', { headers });
    return response.data;
  } catch (error) {
    console.error('Error getting portfolios:', error.response?.data || error);
    throw error;
  }
};

export default {
  uploadPortfolio,
  toggleLikePortfolio,
  getAllPortfolios,
};
