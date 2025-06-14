import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Button from '../../components/Ui/Button';
import api from '../../services/api'; // Pastikan ini axios instance dengan baseURL dan interceptor

const ForumTopicItem = () => {
  const navigate = useNavigate();
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data forum dari backend saat komponen mount
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await api.get('/forums');
        setForums(res.data);
      } catch (error) {
        console.error('Failed to fetch forums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  const handleAddResponse = (forumId) => {
    navigate(`/forum-topic-detail/${forumId}#add-comment`);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading forums...</p>;
  }

  if (forums.length === 0) {
    return <p className="text-center text-gray-500">Belum ada topik diskusi.</p>;
  }

  return (
    <>
      {forums.map((forum) => (
        <div
          key={forum._id}
          className="pb-[50px] border-b-[1px] border-[#D4DADF] max-md:pb-6"
        >
          <Link to={`/forum-topic-detail/${forum._id}`} className="block">
            <h2 className="text-[32px] font-semibold text-gray-800 mb-8 leading-[130%] max-md:text-[24px] max-md:mb-6">
              {forum.title}
            </h2>
          </Link>
          <div className="flex flex-col gap-6 items-start max-md:gap-4">
            <div className="inline-flex items-center gap-5 mb-6 max-md:mb-4 max-md:gap-4">
              <Link to={`/profile/${forum.userID?._id}`} className="flex">
                <img
                  src={
                    forum.userID?.profilePic
                      ? forum.userID.profilePic
                      : '/defaultProfilePic.jpg'
                  }
                  alt={forum.userID?.firstName || forum.userID?.username || 'User'}
                  className="w-16 h-16 rounded-full object-cover max-md:w-12 max-md:h-12"
                />
              </Link>
              <div className="flex flex-col gap-0.5 shrink-0">
                <Link
                  to={`/profile/${forum.userID?._id}`}
                  className="font-semibold text-gray-700"
                >
                  {forum.userID?.firstName || forum.userID?.username || 'User'}
                </Link>
                <span className="text-gray-500 text-sm">
                  {new Date(forum.creationDate).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {forum.description.split('\n')[0]}...
            </p>

            <Button variant="outline" onClick={() => handleAddResponse(forum._id)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path
                  d="M5 13.75L5 16.25L20 16.25L20 18.75L22.5 18.75L22.5 16.25L25 16.25L25 13.75L22.5 13.75L22.5 11.25L20 11.25L20 13.75L5 13.75ZM17.5 8.75L20 8.75L20 11.25L17.5 11.25L17.5 8.75ZM17.5 8.75L15 8.75L15 6.25L17.5 6.25L17.5 8.75ZM17.5 21.25L20 21.25L20 18.75L17.5 18.75L17.5 21.25ZM17.5 21.25L15 21.25L15 23.75L17.5 23.75L17.5 21.25Z"
                  fill="fill-current"
                />
              </svg>
              Tambahkan Tanggapan
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ForumTopicItem;
