import { useEffect, useState, useCallback } from 'react'; // Tambahkan useCallback
import { useNavigate } from 'react-router-dom';
import Button from '../components/Ui/Button';
import ForumTopicItem from '../components/Forum/ForumTopicItem';
import api from '../services/api';

const Forum = () => {
  const navigate = useNavigate();
  const [forumTopics, setForumTopics] = useState([]);
  const [error, setError] = useState(null);

  const handlePostTopicClick = () => {
    navigate('/forum-add-new-discussion');
  };

  // Fetch forums menggunakan useCallback
  const fetchForums = useCallback(async () => {
    try {
      const res = await api.get('/forums');
      setForumTopics(res.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching forums:', err); // Tambahkan logging detail
      setError(err.response?.data?.message || 'Gagal memuat topik forum.');
      // Penanganan error 401/403
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/login'); // Redirect ke login terpusat
      }
    }
  }, [setError, setForumTopics, navigate]); // Tambahkan dependency array

  useEffect(() => {
    fetchForums();
  }, [fetchForums]); // Tambahkan fetchForums ke dependency array

  return (
    <div className="container mx-auto py-25 min-h-screen max-md:py-20">
      <header className="flex justify-between items-center mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
        <h1 className=" text-[62px] font-semibold text-[var(--blue)] max-md:text-[42px]"> {/* PERBAIKAN: Sintaks variabel CSS */}
          Forum
        </h1>
        <Button variant="outline" onClick={handlePostTopicClick}>
          Post Topik Diskusi
        </Button>
      </header>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col gap-[50px] py-[50px] px-[34px] bg-white rounded-[20px] max-md:p-6">
        {forumTopics.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">Tidak ada topik diskusi.</p>
        ) : (
          <ForumTopicItem topics={forumTopics} />
        )}
      </div>
    </div>
  );
};

export default Forum;