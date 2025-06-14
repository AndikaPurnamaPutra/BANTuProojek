import React, { useState } from 'react';
import Button from '../Ui/Button';
import ForumAddSuccessPopup from '../Layout/ForumAddSuccessPopup';
import LoginPopup from '../Layout/LoginPopup';
import api from '../../services/api';

const ForumAddNewDiscussion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length === 0) {
      setError('Judul Diskusi tidak boleh kosong');
      return;
    }
    // Hapus validasi maksimal karakter
    if (description.length === 0) {
      setError('Deskripsi tidak boleh kosong');
      return;
    }

    if (!localStorage.getItem('token')) {
      setShowLoginPopup(true);
      return;
    }

    try {
      await api.post('/forums', { title, description });
      setShowSuccessPopup(true);
      setTitle('');
      setDescription('');
      setError('');
    } catch (error) {
      setError('Gagal membuat topik diskusi.');
      console.error(error);
    }
  };

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
