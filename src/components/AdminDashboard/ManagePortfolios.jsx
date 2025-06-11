import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';

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

const BASE_URL = 'http://localhost:3000';

const ManagePortfolios = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editPortfolio, setEditPortfolio] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    clientMessage: '',
    newMediaFiles: [],
    existingMedia: [],
  });

  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  // Editor untuk deskripsi
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  // Ambil data portfolio
  const fetchPortfolios = async () => {
    setLoading(true);
    try {
      const res = await api.get('/portfolios');
      setPortfolios(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengambil data portofolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Delete portfolio
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus portofolio ini?')) return;
    try {
      await api.delete(`/admin/portfolios/${id}`);
      alert('Portofolio berhasil dihapus');
      fetchPortfolios();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus portofolio');
    }
  };

  // Open modal edit
  const openEditModal = (portfolio) => {
    setEditPortfolio(portfolio);
    setFormData({
      title: portfolio.title || '',
      description: portfolio.description || '',
      category: portfolio.category || '',
      clientMessage: portfolio.clientMessage || '',
      newMediaFiles: [],
      existingMedia: portfolio.media || [],
    });
    setIsEditing(true);
    editor?.commands.setContent(portfolio.description || ''); // set editor content
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditPortfolio(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      clientMessage: '',
      newMediaFiles: [],
      existingMedia: [],
    });
  };

  // Open modal add
  const openAddModal = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      clientMessage: '',
      newMediaFiles: [],
      existingMedia: [],
    });
    setIsAdding(true);
  };

  const closeAddModal = () => {
    setIsAdding(false);
    setFormData({
      title: '',
      description: '',
      category: '',
      clientMessage: '',
      newMediaFiles: [],
      existingMedia: [],
    });
  };

  // Handle input change (text/select/textarea)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle upload file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      newMediaFiles: Array.from(e.target.files),
    }));
  };

  // Submit update portfolio
  const handleUpdatePortfolio = async (e) => {
    e.preventDefault();
    try {
      if (formData.newMediaFiles.length > 0) {
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('clientMessage', formData.clientMessage);
        formData.newMediaFiles.forEach((file) => data.append('media', file));

        await api.put(`/admin/portfolios/${editPortfolio._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Jika tidak upload file baru
        const { newMediaFiles, existingMedia, ...jsonData } = formData;
        await api.put(`/admin/portfolios/${editPortfolio._id}`, jsonData);
      }
      alert('Portofolio berhasil diupdate');
      closeEditModal();
      fetchPortfolios();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengupdate portofolio');
    }
  };

  // Submit add new portfolio
  const handleAddPortfolio = async (e) => {
    e.preventDefault();
    if (formData.newMediaFiles.length === 0) {
      alert('Harap upload minimal satu file media');
      return;
    }
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('clientMessage', formData.clientMessage);
      formData.newMediaFiles.forEach((file) => data.append('media', file));

      await api.post('/admin/portfolios', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Portofolio berhasil ditambahkan');
      closeAddModal();
      fetchPortfolios();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menambahkan portofolio');
    }
  };

  // Filter portfolios berdasarkan title dan category
  const filteredPortfolios = portfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (formData.category === '' || p.category === formData.category)
  );

  // Pagination
  const totalItems = filteredPortfolios.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedPortfolios = filteredPortfolios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-manage-portfolios flex flex-col items-end p-6">
      <div className="flex justify-between items-center mb-6 w-full">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-medium text-gray-800">
          Manage Portfolios
        </h1>
        {/* <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Portfolio
        </button> */}
      </div>

      <div className="mb-4 w-full flex space-x-4">
        <input
          type="text"
          placeholder="Search title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <select
          name="categoryFilter"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categoriesList.map((cat) => (
            <option key={cat} value={cat.toLowerCase()}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b">Title</th>
            <th className="py-3 px-6 border-b">Category</th>
            <th className="py-3 px-6 border-b">Client Message</th>
            <th className="py-3 px-6 border-b">Media</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedPortfolios.map((portfolio) => (
            <tr key={portfolio._id}>
              <td className="py-3 px-6 border-b">{portfolio.title}</td>
              <td className="py-3 px-6 border-b capitalize">
                {portfolio.category}
              </td>
              <td className="py-3 px-6 border-b">
                {portfolio.clientMessage || '-'}
              </td>
              <td className="py-3 px-6 border-b flex space-x-2 overflow-x-auto">
                {(portfolio.media || []).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`media ${i + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </td>
              <td className="py-3 px-6 border-b space-x-4 whitespace-nowrap">
                <button
                  onClick={() => openEditModal(portfolio)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(portfolio._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1 ? 'bg-blue-600 text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal Add/Edit */}
      {(isEditing || isAdding) && (
        <Modal
          title={isEditing ? 'Edit Portfolio' : 'Add New Portfolio'}
          onClose={isEditing ? closeEditModal : closeAddModal}
          onSubmit={isEditing ? handleUpdatePortfolio : handleAddPortfolio}
        >
          <PortfolioForm
            formData={formData}
            onChange={handleInputChange}
            onFileChange={handleFileChange}
            isEditing={isEditing}
            editor={editor}
          />
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose, onSubmit }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-auto max-h-[90%]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);

const PortfolioForm = ({
  formData,
  onChange,
  onFileChange,
  isEditing,
  editor,
}) => (
  <>
    <div>
      <label className="block mb-1">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded"
      />
    </div>
    <div>
      <label className="block mb-1">Description</label>
      <div className="border rounded mb-4 min-h-[150px] p-4 prose max-w-full overflow-auto">
        {editor ? (
          <EditorContent editor={editor} />
        ) : (
          'Loading editor...'
        )}
      </div>
    </div>
    <div>
      <label className="block mb-1">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
        required
      >
        <option value="">-- Select Category --</option>
        {categoriesList.map((cat) => (
          <option key={cat} value={cat.toLowerCase()}>
            {cat}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="block mb-1">Client Message</label>
      <textarea
        name="clientMessage"
        value={formData.clientMessage}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded"
      />
    </div>
    {/* <div>
      <label className="block mb-1">
        Upload Media {isEditing ? '(Optional)' : '(Required)'}
      </label>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={onFileChange}
        className="w-full"
      />
    </div>
    {isEditing &&
      formData.existingMedia &&
      formData.existingMedia.length > 0 && (
        <div className="mt-2 flex space-x-2 overflow-x-auto">
          {formData.existingMedia.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`existing media ${i + 1}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      )} */}
  </>
);

export default ManagePortfolios;
