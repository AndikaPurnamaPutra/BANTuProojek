import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await api.get('/forums');
        setForumTopics(res.data);
        setError(null);
      } catch (err) {
        setError('Gagal memuat topik forum.');
      }
    };
    fetchForums();
  }, []);

  return (
    <div className="container mx-auto py-25 min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className=" text-[62px] font-semibold text-(--blue)">Forum</h1>
        <Button variant="outline" onClick={handlePostTopicClick}>
          Post Topik Diskusi
        </Button>
      </header>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col gap-[50px] py-[50px] px-[34px] bg-white rounded-[20px]">
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
