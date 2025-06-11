import api from './api';

// Buat project baru
const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response?.data || error.message);
    throw error;
  }
};

// Ambil semua project
const getAllProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error getting projects:', error.response?.data || error.message);
    throw error;
  }
};

// Ambil project by ID
const getProjectById = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting project by ID:', error.response?.data || error.message);
    throw error;
  }
};

// Update project by ID
const updateProject = async (id, updateData) => {
  try {
    const response = await api.put(`/projects/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error.response?.data || error.message);
    throw error;
  }
};

// Delete project by ID
const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error.response?.data || error.message);
    throw error;
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
