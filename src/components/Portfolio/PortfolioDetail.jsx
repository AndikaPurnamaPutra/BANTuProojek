import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import Button from '../Ui/Button';

const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  // Fetch portfolio detail from backend
  useEffect(() => {
    setLoading(true);

    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get(`/portfolios/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setItem(res.data);
        setMainImage(
          res.data.media && res.data.media.length > 0
            ? res.data.media[0]
            : null
        );
        setLoading(false);
        setTimeout(() => setShowModal(true), 50);
      } catch (error) {
        console.error('Failed to load portfolio detail:', error);
        navigate('/portfolio'); // Jika tidak ditemukan, redirect ke list
      }
    };

    fetchPortfolio();
  }, [id, navigate]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'auto');
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      if (location.state && location.state.backgroundLocation) {
        navigate(location.state.backgroundLocation);
      } else {
        navigate('/portfolio');
      }
    }, 200);
  };

  const handleCreateProject = () => {
    if (item && item.creatorID) {
      console.log('Portfolio detail data:', item);
      navigate('/create-project', {
        state: { author: item.creatorID.firstName || item.creatorID.username },
      });
    }
  };

  if (loading || !item) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white text-sm">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <span>Loading portfolio...</span>
        </div>
      </div>
    );
  }

  // Media lain selain media utama
  const otherMedia =
    item.media && item.media.length > 1 ? item.media.slice(1) : [];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-end w-full h-full overflow-hidden cursor-pointer transition-opacity duration-300"
      onClick={handleClose}
    >
      <button
        onClick={handleClose}
        className="absolute top-0 right-0 w-10 h-10 text-3xl text-gray-300 hover:text-white z-50 transition-all duration-300 cursor-pointer"
        aria-label="Close"
        title="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        className={`relative bg-[#FFF9EF] rounded-t-[12px] w-full h-[calc(100vh-40px)] overflow-y-scroll cursor-default 
          pt-16 px-6 md:px-[100px] pb-24 transition-all duration-300 gap-14 flex flex-col
          ${
            showModal
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-[56px] leading-[150%] text-[var(--blue)] font-bold max-w-[1240px]">
          {item.title}
        </h1>

        <div className="flex justify-between items-center bg-[#FFF9EF]">
          <Link
            to={`/profile/${item.creatorID._id}`}
            className="flex items-center gap-3"
          >
            <img
              src={
                item.creatorID.profilePic
                  ? item.creatorID.profilePic
                  : 'defaultProfilePic.jpg'
              }
              alt={item.creatorID.firstName || item.creatorID.username}
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-sm font-medium">
              {item.creatorID.firstName || item.creatorID.username}
            </span>
          </Link>
          <Button variant="primary" onClick={handleCreateProject}>
            Buat Projek
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {mainImage && (
            <img
              src={mainImage}
              alt={item.title}
              className="rounded-xl w-full object-cover"
            />
          )}
          <div
            className="text-gray-800 leading-relaxed text-[15px] space-y-4 text-justify"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>

        {otherMedia.length > 0 && (
          <div className="flex flex-col gap-12 mt-16">
            <div className="flex justify-between items-end">
              <h2 className="text-[42px] leading-[150%] text-[var(--blue)] font-bold">
                More Preview
              </h2>
              <Link to={`/profile/${item.creatorID._id}`}>
                <Button variant="link">View Profile</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherMedia.map((mediaUrl, idx) => (
                <img
                  key={idx}
                  src={mediaUrl}
                  alt={`${item.title} preview ${idx + 2}`}
                  className="rounded-xl w-full max-h-[280px] h-full object-cover hover:opacity-90 transition"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center items-center gap-8 bg-white mt-16 py-14 px-10 rounded-3xl">
          <h2 className="text-[36px] text-[var(--blue)] font-bold leading-[150%]">
            Hire Me!
          </h2>
          <Link
            to={`/profile/${item.creatorID._id}`}
            className="flex flex-col items-center gap-3"
          >
            <img
              src={
                item.creatorID?.profilePic
                  ? item.creatorID.profilePic
                  : 'defaultProfilePic.jpg'
              }
              alt={item.creatorID.firstName || item.creatorID.username}
              className="w-[124px] h-[124px] rounded-full object-cover"
            />
            <span className="text-[24px]">
              {item.creatorID?.firstName || item.creatorID.username}
            </span>
          </Link>
          <p className="text-sm text-center max-w-md">
            Support by cozy things! Ready to collaborate for your next creative
            project 🚀
          </p>
          <Button variant="primary" onClick={handleCreateProject}>
            Buat Projek
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetail;
