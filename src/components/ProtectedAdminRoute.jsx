import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Pastikan import benar

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    // const currentTime = Date.now() / 1000; // dalam detik
    // if (decodedToken.exp < currentTime) {
    //   // Token expired
    //   localStorage.removeItem('token');
    //   return <Navigate to="/login" />;
    // }
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

// import { Navigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode'; // pastikan ini impor default

// const ProtectedAdminRoute = ({ children }) => {
//   const token = localStorage.getItem('token'); // harus sama dengan key token yang disimpan

//   if (!token) {
//     return <Navigate to="/admin/login" />;
//   }

//   try {
//     const decodedToken = jwtDecode(token);
//     if (decodedToken.role !== 'admin') {
//       return <Navigate to="/" />;
//     }
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return <Navigate to="/admin/login" />;
//   }

//   return children;
// };

// export default ProtectedAdminRoute;
