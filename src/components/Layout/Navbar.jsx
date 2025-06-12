import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logos/logo_brand.svg';
import { AlignJustify, X, User } from 'lucide-react';
import NavLinks from './NavLinks';
import Button from '../Ui/Button';
import LoginPopup from './LoginPopup';
import { getProfile } from '../../services/userService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  // Fungsi cek login dan fetch user profile
  const checkLogin = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getProfile()
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          // Token invalid / expired
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    // Jalankan pertama kali
    checkLogin();

    // Tambah event listener untuk event custom 'authChange'
    const onAuthChange = () => {
      checkLogin();
    };
    window.addEventListener('authChange', onAuthChange);

    // Cleanup saat unmount
    return () => {
      window.removeEventListener('authChange', onAuthChange);
    };
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // kalau ada disimpan
    setIsLoggedIn(false);
    setUser(null);
    setIsOpen(false);

    // Beri tahu komponen lain bahwa auth berubah
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  const openLoginPopup = () => {
    setShowLoginPopup(true);
    setIsOpen(false); // tutup menu jika di mobile
  };

  const openLoginPopupForJob = () => {
    setShowLoginPopup(true);
    setRedirectOnClose('/'); // simpan URL redirect
    setIsOpen(false);
  };

  const [redirectOnClose, setRedirectOnClose] = useState(null);

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
      <nav className="bg-[#FFF9EF] border-b-2 border-b-[#F3F3F3] sticky top-0 z-50">
        <div className="container flex items-center justify-between py-8 max-lg:py-5">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="max-w-[108px] w-full max-lg:w-[72px]"
              alt="Logo"
            />
          </Link>

          <div className="flex items-center gap-4 lg:hidden">
            {isLoggedIn && user && (
              <Link to="/profile" className="lg:hidden flex items-center gap-2">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-amber-50 border-1 outline-(--blue-light) outline-2"
                  />
                ) : (
                  <User size={28} className="text-blue-600" />
                )}
                <span className="text-(--blue) text-sm max-md:hidden">
                  {user.firstName}
                </span>
              </Link>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
              {isOpen ? <X size={22} /> : <AlignJustify size={22} />}
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-[60px]">
            <NavLinks
              isLoggedIn={isLoggedIn}
              onShowLoginPopup={openLoginPopup} // default popup
              onShowLoginPopupForJob={openLoginPopupForJob} // khusus loker
            />
          </div>

          {!isLoggedIn ? (
            <div className="hidden lg:flex space-x-2">
              <Button to="/login" variant="outline">
                Masuk
              </Button>
              <Button to="/register" variant="primary">
                Daftar
              </Button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-6 relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-amber-50 border-1 outline-(--blue-light) outline-2"
                  />
                ) : (
                  <User size={28} className="text-blue-600" />
                )}
                {/* <span>{user?.firstName}</span> */}
              </div>

              <div className="absolute top-full right-0 w-[150px] bg-white rounded-md shadow-md flex flex-col opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                <Link to="/profile" className="px-4 py-2 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 w-full px-4 py-2 hover:bg-gray-100"
                >
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className={`absolute top-full left-0 right-0 bg-white transition-all duration-500 ease-in-out overflow-hidden lg:hidden ${
            isOpen ? 'h-[calc(100dvh-60px)] p-6 ' : 'h-0'
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center gap-8 h-full transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <NavLinks
              isLoggedIn={isLoggedIn}
              onShowLoginPopup={openLoginPopup}
              onShowLoginPopupForJob={openLoginPopupForJob}
              onLinkClick={() => setIsOpen(false)}
            />
            {!isLoggedIn ? (
              <div className="flex flex-col w-full gap-4">
                <Button className="w-full" to="/login" variant="outline">
                  Masuk
                </Button>
                <Button className="w-full" to="/register" variant="primary">
                  Daftar
                </Button>
              </div>
            ) : (
              <Button
                className="w-full"
                onClick={handleLogout}
                variant="outline"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={closeLoginPopup}
        redirectOnClose={redirectOnClose}
      />
    </>
  );
};

export default Navbar;
