import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import LoginPopup from '../Layout/LoginPopup';
import api from '../../services/api';
import IcArrow from '../../assets/icons/ic-arrow_right-v2.svg';

const ForumTopicDetail = () => {
  const { id } = useParams();
  const [topicData, setTopicData] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTopic = await api.get(`/forums/${id}`);
        setTopicData(resTopic.data);

        const resComments = await api.get(`/comments/forum/${id}`);
        setComments(resComments.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (window.location.hash === '#add-comment' && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = async () => {
    if (!localStorage.getItem('token')) {
      setShowLoginPopup(true);
      return;
    }
    if (!comment.trim()) return;

    try {
      const res = await api.post('/comments', {
        forumID: id,
        content: comment,
      });
      setComments((prev) => [...prev, res.data]);
      setComment('');
    } catch (error) {
      alert('Gagal mengirim komentar.');
      console.error(error);
    }
  };

  const closeLoginPopup = () => setShowLoginPopup(false);

  // Helper untuk mendapatkan URL gambar profile lengkap
  const getProfilePicUrl = (profilePic) => {
    if (!profilePic) return '/defaultProfilePic.jpg';
    if (profilePic.startsWith('http')) return profilePic;
    return profilePic;
  };

  return (
    <section className="pt-[65px] pb-[100px]">
      <div className="container">
        {!topicData ? (
          <p className="text-center py-20 text-gray-500 bg-white p-[50px] rounded-[20px]">
            Loading...
          </p>
        ) : (
          <div className="bg-white p-[50px] rounded-[20px] max-md:p-6">
            <header className="flex items-center mb-8">
              <a href="/forum" className="text-blue-500 hover:underline mr-4 inline-flex">
                <img src={IcArrow} alt="Arrow" className="w-8 h-8 shrink-0" />
              </a>
              <h1 className="text-[32px] font-semibold text-gray-800 leading-[130%] max-md:text-[24px]">
                {topicData.title}
              </h1>
            </header>

            <div className="pb-[70px] border-b-[1px] border-[#D4DADF] mb-[70px] max-lg:pb-10 max-lg:mb-10">
              <div className="flex items-start gap-5 mb-4">
                <img
                  src={getProfilePicUrl(topicData.userID.profilePic)}
                  alt={topicData.userID.firstName || topicData.userID.username}
                  className="w-16 h-16 rounded-full object-cover max-md:w-12 max-md:h-12"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {topicData.userID.firstName || topicData.userID.username}
                  </p>
                  <span className="text-gray-500 text-sm">
                    {new Date(topicData.creationDate).toLocaleDateString(
                      'id-ID',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      }
                    )}
                  </span>
                </div>
              </div>
              <div className="text-gray-700 whitespace-pre-line">
                {topicData.description}
              </div>
            </div>

            <div className="flex flex-col gap-12">
              <h3 className="text-lg font-semibold text-(--blue)">
                Diskusi ({comments.length})
              </h3>

              {comments.map((c) => (
                <div key={c._id} className="flex flex-col gap-6 mb-6">
                  <div className="flex items-start gap-5">
                    <img
                      src={getProfilePicUrl(c.userID.profilePic)}
                      alt={c.userID.firstName || c.userID.username || 'User'}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {c.userID.firstName || c.userID.username}
                      </p>
                      <span className="text-gray-500 text-sm">
                        {new Date(c.creationDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 whitespace-pre-line">
                    {c.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative flex mt-6">
              <textarea
                ref={textareaRef}
                className="w-full py-[14px] px-[32px] border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tulis Komentar..."
                value={comment}
                onChange={handleCommentChange}
              />
              <Button
                variant="icon"
                onClick={handleSubmit}
                className="absolute top-[6px] right-[6px] fill-current"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3.4 20.4L20.85 12.92C21.03 12.84 21.18 12.71 21.29 12.55C21.4 12.39 21.45 12.2 21.45 12C21.45 11.8 21.4 11.61 21.29 11.44C21.18 11.29 21.03 11.16 20.85 11.08L3.4 3.6C3.25 3.53 3.08 3.5 2.92 3.52C2.76 3.54 2.6 3.59 2.46 3.68C2.32 3.77 2.21 3.89 2.13 4.04C2.05 4.18 2.01 4.35 2.01 4.51L2 9.12C2 9.62 2.37 10.05 2.87 10.11L17 12L2.87 13.88C2.37 13.95 2 14.38 2 14.88L2.01 19.49C2.01 20.2 2.74 20.69 3.4 20.4Z" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>

      <LoginPopup isOpen={showLoginPopup} onClose={closeLoginPopup} />
    </section>
  );
};

export default ForumTopicDetail;
