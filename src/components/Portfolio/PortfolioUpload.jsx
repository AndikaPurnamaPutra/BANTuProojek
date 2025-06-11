import React, { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';

const buttonBaseClass = `px-3 py-1 rounded border focus:outline-none transition`;
const activeClass = `bg-blue-600 text-white border-blue-600`;
const inactiveClass = `bg-white text-gray-700 border-gray-300 hover:bg-gray-100`;

const PortfolioUpload = () => {
  const [mainFile, setMainFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([null, null, null]);
  const [mainFilePreview, setMainFilePreview] = useState(null);
  const [additionalFilePreviews, setAdditionalFilePreviews] = useState([
    null,
    null,
    null,
  ]);

  const [uploadedMediaUrls, setUploadedMediaUrls] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validFileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/webm',
    'video/mp4',
  ];

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const categoriesList = [
    'Copywriter',
    'Branding',
    'Videography',
    'Photography',
    'Illustration',
    'Graphic Design',
    'Animation',
    'Art Director',
    'Video Editing',
    'UI/UX Design',
    'Motion Graphics',
    'Social Media Design',
    'Design Manager',
  ];

  // Initialize the editor for description
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: description,
    onUpdate: ({ editor }) => {
      const updatedDescription = editor.getHTML();
      setDescription(updatedDescription);
      checkFormValidity(title, updatedDescription, selectedCategory, mainFile);
    },
  });

  const handleMainFileChange = (files) => {
    const file = files[0];

    if (!file) return;

    if (!validFileTypes.includes(file.type)) {
      setFileError('Format file utama tidak didukung.');
      setMainFile(null);
      setMainFilePreview(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Ukuran file utama melebihi 10MB.');
      setMainFile(null);
      setMainFilePreview(null);
      return;
    }

    setFileError('');
    setMainFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setMainFilePreview(reader.result);
    reader.readAsDataURL(file);

    checkFormValidity(title, description, selectedCategory, file);
  };

  const handleAdditionalFileChange = (index, files) => {
    const file = files[0];

    if (!file) return;

    if (!validFileTypes.includes(file.type)) {
      setFileError('Format file tambahan tidak didukung.');
      const updatedFiles = [...additionalFiles];
      updatedFiles[index] = null;
      setAdditionalFiles(updatedFiles);

      const updatedPreviews = [...additionalFilePreviews];
      updatedPreviews[index] = null;
      setAdditionalFilePreviews(updatedPreviews);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError('Ukuran file tambahan melebihi 10MB.');
      const updatedFiles = [...additionalFiles];
      updatedFiles[index] = null;
      setAdditionalFiles(updatedFiles);

      const updatedPreviews = [...additionalFilePreviews];
      updatedPreviews[index] = null;
      setAdditionalFilePreviews(updatedPreviews);
      return;
    }

    setFileError('');

    const updatedFiles = [...additionalFiles];
    updatedFiles[index] = file;
    setAdditionalFiles(updatedFiles);

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedPreviews = [...additionalFilePreviews];
      updatedPreviews[index] = reader.result;
      setAdditionalFilePreviews(updatedPreviews);
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    checkFormValidity(title, description, e.target.value, mainFile);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    checkFormValidity(e.target.value, description, selectedCategory, mainFile);
  };

  const checkFormValidity = (titleVal, descVal, categoryVal, mainFileVal) => {
    if (
      titleVal.trim() &&
      descVal.trim() &&
      categoryVal.trim() &&
      mainFileVal
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isButtonEnabled) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('category', selectedCategory.trim().toLowerCase());

      if (mainFile) formData.append('media', mainFile);

      additionalFiles.forEach((file) => {
        if (file) formData.append('media', file);
      });

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await api.post('/portfolios', formData, config);

      alert('Portfolio berhasil diunggah!');
      setUploadedMediaUrls(response.data.media || []);

      // Reset form
      setMainFile(null);
      setMainFilePreview(null);
      setAdditionalFiles([null, null, null]);
      setAdditionalFilePreviews([null, null, null]);
      setTitle('');
      setDescription('');
      setSelectedCategory('');
      setFileError('');
      navigate('/profile');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Gagal mengunggah portfolio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#FFF9EF] flex items-center px-12 py-10">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px]">
          <h2 className="font-Parkinsans text-[52px] font-medium leading-[150%] text-(--blue)">
            Unggah Karya
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          {fileError && <div className="text-red-600">{fileError}</div>}

          {/* File utama */}
          <div className="flex flex-col gap-3">
            <label className="text-lg font-light text-[#7F909F]">
              File Karya Utama
            </label>
            <div
              onClick={() => document.getElementById('main-file-input').click()}
              className={`flex flex-col justify-center items-center gap-4 ${
                mainFilePreview
                  ? 'border-none p-0'
                  : 'border-dashed border-2 border-gray-200 p-4 bg-white h-full min-h-[697px]'
              } cursor-pointer`}
            >
              <input
                type="file"
                id="main-file-input"
                style={{ display: 'none' }}
                accept={validFileTypes.join(',')}
                onChange={(e) => handleMainFileChange(e.target.files)}
              />
              {mainFilePreview ? (
                <div
                  className="relative w-full"
                  style={{ paddingTop: '62.5%' }}
                >
                  <img
                    src={mainFilePreview}
                    alt="Main File Preview"
                    className="absolute top-0 left-0 w-full h-full object-cover bg-[#F3F3F3]"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-8">
                  <svg
                    width="258"
                    height="245"
                    viewBox="0 0 258 245"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="block"
                  >
                    <circle cx="189" cy="176" r="69" fill="#DCF343" />
                    <rect
                      x="21"
                      y="42"
                      width="21"
                      height="126"
                      fill="#344EAD"
                    />
                    <rect
                      x="168"
                      y="42"
                      width="21"
                      height="126"
                      fill="#344EAD"
                    />
                    <rect
                      x="168"
                      y="21"
                      width="21"
                      height="126"
                      transform="rotate(90 168 21)"
                      fill="#344EAD"
                    />
                    <rect
                      x="42"
                      y="189"
                      width="21"
                      height="126"
                      transform="rotate(-90 42 189)"
                      fill="#344EAD"
                    />
                  </svg>
                  <h3 className="text-[32px] text-black font-Parkinsans font-medium text-center max-w-[648px] leading-[150%]">
                    Seret dan jatuhkan atau klik untuk memilih file
                  </h3>
                  <div className="flex flex-col text-center">
                    <span className="text-sm font-light leading-[180%] text-[#7F909F]">
                      Maksimal ukuran foto 10 mb
                    </span>
                    <span className="text-sm font-light leading-[180%] text-[#7F909F]">
                      File karya harus berekstensi PNG, JPG, GIF, atau WebM
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* File tambahan */}
          <div className="flex flex-col gap-3">
            <label className="text-lg font-light text-[#7F909F]">
              File Tambahan
            </label>
            <div className="flex justify-between gap-5">
              {additionalFiles.map((_, index) => (
                <div
                  key={index}
                  onClick={() =>
                    document
                      .getElementById(`additional-file-input-${index}`)
                      .click()
                  }
                  className={`w-full flex flex-col justify-center items-center gap-4 cursor-pointer ${
                    additionalFilePreviews[index]
                      ? 'border-none p-0'
                      : 'border-dashed border-2 border-gray-200 p-4 bg-white min-h-[229px]'
                  }`}
                >
                  <input
                    type="file"
                    id={`additional-file-input-${index}`}
                    style={{ display: 'none' }}
                    accept={validFileTypes.join(',')}
                    onChange={(e) =>
                      handleAdditionalFileChange(index, e.target.files)
                    }
                  />
                  {additionalFilePreviews[index] ? (
                    <div
                      className="relative w-full"
                      style={{ paddingTop: '62.5%' }}
                    >
                      <img
                        src={additionalFilePreviews[index]}
                        alt={`Additional File Preview ${index + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover bg-[#F3F3F3]"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-10 block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                        />
                      </svg>
                      <h3 className="text-[16px] text-center">
                        Tambahkan Preview
                      </h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Kategori */}
          <div className="flex flex-col gap-3">
            <label className="text-lg font-light text-[#7F909F]">
              Kategori<span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((category) => (
                <div key={category} className="inline-flex items-center">
                  <input
                    type="radio"
                    id={category}
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={handleCategoryChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={category}
                    className={`py-3 px-6 border transition-all duration-300 rounded-full cursor-pointer ${
                      selectedCategory === category
                        ? 'border-[var(--blue)] text-[var(--blue)]'
                        : 'border-[#D4DADF] text-[#7F909F]'
                    }`}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Judul */}
          <div className="flex flex-col gap-3">
            <label className="text-lg font-light text-[#7F909F]">
              Judul<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Tuliskan Judul"
              value={title}
              onChange={handleTitleChange}
              className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-[#AAB5BF]"
              required
            />
          </div>

          {/* Deskripsi */}
          <div className="flex flex-col gap-3">
            <label className="text-lg font-light text-[#7F909F]">
              Deskripsi<span className="text-red-500">*</span>
            </label>
            <div className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder-[#AAB5BF] min-h-64">
              {editor ? <EditorContent editor={editor} /> : 'Loading editor...'}
            </div>
          </div>

          {/* Tombol submit */}
          <button
            type="submit"
            disabled={!isButtonEnabled || loading}
            className={`py-4 px-6 transition-all duration-300 rounded-full ${
              isButtonEnabled
                ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Mengunggah...' : 'Unggah'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PortfolioUpload;
