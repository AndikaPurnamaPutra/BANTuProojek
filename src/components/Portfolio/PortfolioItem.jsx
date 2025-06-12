import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../../services/api';

const PortfolioItem = ({
  id,
  image,
  title,
  author,
  profile,
  likes = 0,
  initialLiked = false,
}) => {
  const location = useLocation();
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);

  // Update isLiked state saat props initialLiked berubah (misalnya saat data baru dari backend)
  useEffect(() => {
    setIsLiked(initialLiked);
  }, [initialLiked]);

  // Update likeCount jika prop likes berubah (misalnya update dari parent)
  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  const toggleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Silakan login untuk memberikan like');
        return;
      }

      const res = await api.put(`/portfolios/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Sinkronisasi state dengan response dari backend
      setIsLiked(res.data.liked);
      setLikeCount(res.data.likesCount);
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Gagal update like. Coba lagi.');
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Link
        to={`/portfolio/${id}`}
        state={{ backgroundLocation: location }}
        className="relative group block overflow-hidden rounded-[8px] h-full"
      >
        <img
          src={image}
          alt={title}
          className="rounded-[8px] w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-[#3d3d4e]/65 to-transparent transition-all duration-500 rounded-[8px] flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100">
          <h3 className="text-[18px] text-white font-semibold">{title}</h3>
        </div>
      </Link>

      <div className="flex justify-between items-center">
        <Link
          to={`/portfolio/${id}`}
          state={{ backgroundLocation: location }}
          className="flex gap-2 items-center"
        >
          <img
            src={profile}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover border-2 border-(--blue-light)"
          />
          <span className="text-[14px]">{author}</span>
        </Link>
        <button
          onClick={toggleLike}
          className="flex gap-1 items-center cursor-pointer"
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`size-5 ${isLiked ? 'text-[#ea64d9]' : 'text-gray-500'}`}
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          <span className="text-[12px]">{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default PortfolioItem;
