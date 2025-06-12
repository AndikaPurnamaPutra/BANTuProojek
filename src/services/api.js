import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
});

// Request interceptor → kasih token kecuali No-Auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Kalau header No-Auth true, jangan kirim token
  if (token && config.headers && !config.headers['No-Auth']) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor → handle error 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Definisikan public path sebagai regex pattern → hanya /users/:id saja yang public
    const publicPaths = [/^\/users\/[^\/]+$/];

    // Ambil path dari URL request → supaya aman meskipun pakai baseURL
    const requestPath = new URL(error.config.url, api.defaults.baseURL).pathname;

    // Cek apakah path yang diminta adalah public
    const isPublicPath = publicPaths.some((pattern) => pattern.test(requestPath));

    // Kalau 401 dan bukan public path → redirect sesuai aturan
    if (error.response?.status === 401 && !isPublicPath) {
      localStorage.removeItem('token');

      const isAdminPage = window.location.pathname.startsWith('/admin');
      const redirectTo = isAdminPage ? '/admin/login' : '/login';

      window.location.href = `${redirectTo}?sessionExpired=true`;
    }

    return Promise.reject(error);
  }
);

export default api;
