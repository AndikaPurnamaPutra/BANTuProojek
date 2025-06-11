import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Ui/Button';
import PortfolioItem from '../components/Portfolio/PortfolioItem';
import { getProfile, getUserById } from '../services/userService';

const Profile = () => {
  const { id } = useParams(); // ambil id dari URL (bisa undefined)
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // user login
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ambil data user login sekaligus
    const fetchCurrentUser = async () => {
      try {
        const res = await getProfile();
        setCurrentUser(res.data);
      } catch {
        setCurrentUser(null);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let res;
        if (id) {
          // Ambil user by ID jika ada param id
          res = await getUserById(id);
        } else {
          // Ambil profile user login
          res = await getProfile();
        }
        setUser(res.data);
      } catch {
        setError('Gagal memuat profil. Silakan coba lagi.');
      }
    };
    fetchUser();
  }, [id]);

  if (error) return <p className="text-center mt-20">{error}</p>;
  if (!user) return <p className="text-center mt-20">Loading profil...</p>;

  // Tentukan apakah ini profil sendiri dengan membandingkan user login dan user yang dilihat
  const isOwnProfile = currentUser && user && currentUser._id === user._id;

  const portfolios = user.portfolios || [];
  const userId = user._id;

  return (
    <section className="max-w-[1440px] mx-auto py-30 bg-[#FFF9EF] min-h-screen">
      <div className="container">
        {/* Profile Section */}
        <div className="flex justify-center items-center gap-8 relative">
          <img
            src={user.profilePic ? user.profilePic : 'defaultProfilePic.jpg'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-lg font-medium text-black leading-[180%]">
                {user.firstName || user.username || 'Unknown'}
              </h2>
              <p className="text-[16px] font-light text-gray-400">
                {user.role || 'Role tidak tersedia'}
              </p>
            </div>
            <div className="flex gap-4">
              {/* Tampilkan tombol hanya jika ini profil sendiri */}
              {isOwnProfile && (
                <>
                  <Button variant="primary" to="/portfolio-upload">
                    Unggah Karya
                  </Button>
                  <Link
                    to={{
                      pathname: '/edit-profile',
                      state: { profileData: user },
                    }}
                  >
                    <Button variant="outline">Edit Profil</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-18" />

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.length > 0 ? (
            portfolios.map((portfolio) => {
              const isLiked = portfolio.likes
                ? portfolio.likes.some((likeUserId) => likeUserId.toString() === userId.toString())
                : false;

              return (
                <PortfolioItem
                  key={portfolio._id}
                  id={portfolio._id}
                  title={portfolio.title}
                  image={
                    portfolio.media && portfolio.media.length > 0
                      ? portfolio.media[0]
                      : 'defaultPortfolioImg.jpg'
                  }
                  author={user.firstName || user.username}
                  profile={
                    user.profilePic
                      ? user.profilePic
                      : 'defaultProfilePic.jpg'
                  }
                  likes={portfolio.likes ? portfolio.likes.length : 0}
                  initialLiked={isLiked}
                />
              );
            })
          ) : (
            <p className="text-center text-gray-500">Belum ada karya yang diunggah.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
