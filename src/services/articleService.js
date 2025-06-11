// src/services/articleService.js
import api from './api';

export const fetchArticles = () => api.get('/artikels');
export const fetchArticleById = (id) => api.get(`/artikels/${id}`);
