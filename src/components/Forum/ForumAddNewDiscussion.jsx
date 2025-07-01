import React, { useState, useCallback } from 'react'; // Tambahkan useCallback
import Button from '../Ui/Button';
import ForumAddSuccessPopup from '../Layout/ForumAddSuccessPopup';
import LoginPopup from '../Layout/LoginPopup';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom'; // Tambahkan useNavigate

const ForumAddNewDiscussion = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError(''); // Reset error sebelum validasi dan submit

      // Validasi frontend
      if (title.trim().length === 0) {
        setError('Judul Diskusi tidak boleh kosong.');
        return;
      }
      if (description.trim().length === 0) {
        setError('Deskripsi tidak boleh kosong.');
        return;
      }

      const token = localStorage.getItem('token');
      // Jika backend membutuhkan userID di body untuk membuat forum, ambil dari localStorage
      // const userId = localStorage.getItem('userId');

      if (!token) {
        // Periksa token
        setShowLoginPopup(true);
        return;
      }

      try {
        await api.post('/forums', {
          title: title.trim(), // Kirim data yang sudah di-trim
          description: description.trim(), // Kirim data yang sudah di-trim
          // Jika backend membutuhkan userID di body:
          // creatorID: userId,
        });
        setShowSuccessPopup(true);
        setTitle('');
        setDescription('');
        setError(''); // Reset error setelah sukses
      } catch (error) {
        console.error('Error creating forum topic:', error); // Logging error lebih detail
        setError(
          error.response?.data?.message || 'Gagal membuat topik diskusi.'
        );
        // Penanganan error 401/403
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userId');
          navigate('/login'); // Arahkan ke halaman login
        }
      }
    },
    [
      title,
      description,
      setError,
      setShowSuccessPopup,
      setShowLoginPopup,
      navigate,
    ]
  ); // Dependency array

  return (
    <>
      <section className="py-16">
        <div className="container flex flex-col">
          <div className="flex flex-col gap-[50px] bg-white p-12 rounded-[20px] shadow-lg max-md:gap-8 max-md:p-6">
            <div>
              <h2 className="text-[32px] font-bold text-gray-800 pb-12 border-b-[1px] border-[#D4DADF] max-md:pb-6">
                Diskusi Baru
              </h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-start gap-[50px] max-md:gap-8"
            >
              <div className="flex flex-col gap-5 w-full">
                <label
                  className="block text-lg font-medium text-gray-700"
                  htmlFor="title"
                >
                  Judul Diskusi
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Tuliskan Judul"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-5 w-full">
                <label
                  className="block text-lg font-medium text-gray-700"
                  htmlFor="description"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tuliskan Deskripsi"
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <Button variant="primary" type="submit">
                Post Topik Diskusi
              </Button>
            </form>
          </div>
        </div>
      </section>

      {showSuccessPopup && (
        <ForumAddSuccessPopup onClose={() => setShowSuccessPopup(false)} />
      )}
      {showLoginPopup && (
        <LoginPopup
          isOpen={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
        />
      )}
    </>
  );
};

export default ForumAddNewDiscussion;
