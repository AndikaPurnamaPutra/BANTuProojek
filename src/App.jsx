import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './components/Portfolio/PortfolioDetail';
import PortfolioFormHire from './components/Portfolio/PortfolioFormHire';
import Forum from './pages/Forum';
import ForumTopicDetail from './components/Forum/ForumTopicDetail';
import ForumAddNewDiscussion from './components/Forum/ForumAddNewDiscussion';
import Article from './pages/Article';
import ArticleDetail from './components/Article/ArticleDetail';
import Job from './pages/Job';
import JobDetail from './components/Job/JobDetail';
import Event from './pages/Event';
import Aboutus from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './components/Profile/EditProfile';
import PortfolioUpload from './components/Portfolio/PortfolioUpload';

import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import ManageUsers from './components/AdminDashboard/ManageUsers';
import ManagePortfolios from './components/AdminDashboard/ManagePortfolios';
import ManageArtikel from './components/AdminDashboard/ManageArtikel';
import ManageJob from './components/AdminDashboard/ManageJob';
import ManageForum from './components/AdminDashboard/ManageForum';
import ManageEvent from './components/AdminDashboard/ManageEvent';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

function App() {
  const location = useLocation();
  const state = location.state;

  // Menentukan apakah saat ini berada di halaman Login, Register, atau Admin
  const isAuthOrAdminPage =
    location.pathname.startsWith('/login') ||
    location.pathname.startsWith('/register') ||
    location.pathname.startsWith('/admin');

  return (
    <>
      {/* Navbar dan Footer hanya ditampilkan jika bukan halaman auth / admin */}
      {!isAuthOrAdminPage && <Navbar />}

      {/* Base routes */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/create-project" element={<PortfolioFormHire />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum-topic-detail/:id" element={<ForumTopicDetail />} />
        <Route
          path="/forum-add-new-discussion"
          element={<ForumAddNewDiscussion />}
        />
        <Route path="/article" element={<Article />} />
        <Route path="/article-detail/:id" element={<ArticleDetail />} />
        <Route path="/job" element={<Job />} />
        <Route path="/job-detail/:id" element={<JobDetail />} />
        <Route path="/event" element={<Event />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/portfolio-upload" element={<PortfolioUpload />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/portfolios"
          element={
            <ProtectedAdminRoute>
              <ManagePortfolios />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedAdminRoute>
              <ManageUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/articles"
          element={
            <ProtectedAdminRoute>
              <ManageArtikel />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <ProtectedAdminRoute>
              <ManageJob />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/forums"
          element={
            <ProtectedAdminRoute>
              <ManageForum />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <ProtectedAdminRoute>
              <ManageEvent />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      {/* Modal layer */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        </Routes>
      )}

      {/* Footer hanya ditampilkan jika bukan halaman auth / admin */}
      {!isAuthOrAdminPage && <Footer />}
    </>
  );
}

export default App;
