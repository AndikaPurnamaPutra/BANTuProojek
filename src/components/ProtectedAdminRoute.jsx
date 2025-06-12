import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // dalam detik

    // Cek expired token
    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to="/admin/login" />;
    }

    // Cek role
    if (decodedToken.role !== 'admin') {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedAdminRoute;
