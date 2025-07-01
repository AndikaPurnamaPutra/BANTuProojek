import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import api from '../../services/api';

const categoriesList = [
  'Copywriter', 'Branding', 'Videography', 'Photography', 'Illustration',
  'Graphic Design', 'Animation', 'Art Director', 'Video Editing', 'UI/UX Design',
  'Motion Graphics', 'Social Media Design', 'Design Manager',
];

// MenuBar component untuk Tiptap editor (tetap sama)
const buttonBaseClass = `px-3 py-1 rounded border focus:outline-none transition`;
const activeClass = `bg-blue-600 text-white border-blue-600`;
const inactiveClass = `bg-white text-gray-700 border-gray-300 hover:bg-gray-100`;

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="mb-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('paragraph') ? activeClass : inactiveClass
        }`}
        aria-label="Paragraph"
        title="Paragraph"
      >
        P
      </button>

      {[1, 2, 3].map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={`${buttonBaseClass} ${
            editor.isActive('heading', { level }) ? activeClass : inactiveClass
          }`}
          aria-label={`Heading ${level}`}
          title={`Heading ${level}`}
        >
          H{level}
        </button>
      ))}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('bold') ? activeClass : inactiveClass
        }`}
        aria-label="Bold"
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('italic') ? activeClass : inactiveClass
        }`}
        aria-label="Italic"
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('underline') ? activeClass : inactiveClass
        }`}
        aria-label="Underline"
        title="Underline"
      >
        U
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('strike') ? activeClass : inactiveClass
        }`}
        aria-label="Strike"
        title="Strike"
      >
        S
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('blockquote') ? activeClass : inactiveClass
        }`}
        aria-label="Blockquote"
        title="Blockquote"
      >
        ❝
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('bulletList') ? activeClass : inactiveClass
        }`}
        aria-label="Bullet List"
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${buttonBaseClass} ${
          editor.isActive('orderedList') ? activeClass : inactiveClass
        }`}
        aria-label="Ordered List"
        title="Ordered List"
      >
        1. List
      </button>

      <button
        type="button"
        onClick={addLink}
        className={`${buttonBaseClass} ${
          editor.isActive('link') ? activeClass : inactiveClass
        }`}
        aria-label="Add Link"
        title="Add Link"
      >
        🔗
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        className={`text-red-600 disabled:opacity-50 ${buttonBaseClass}`}
        aria-label="Remove Link"
        title="Remove Link"
      >
        ❌
      </button>

      <button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .clearNodes()
            .unsetAllMarks()
            .setParagraph()
            .run()
        }
        className={`${buttonBaseClass} text-gray-600`}
        aria-label="Clear Formatting"
        title="Clear Formatting"
      >
        Clear
      </button>
    </div>
  );
};

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
    existingMedia: [], // Ini akan berisi URL lengkap dari backend
  });

  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      alert('Anda tidak memiliki izin untuk mengakses halaman ini.');
      navigate('/');
    }
  }, [navigate]);

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      // PERBAIKAN 1: Endpoint API yang benar untuk admin
      const res = await api.get('/users/admin/portfolios');
      setPortfolios(res.data);
    } catch (err) {
      console.error('Error fetching portfolios:', err);
      alert(err.response?.data?.message || 'Gagal mengambil data portofolio');
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  useEffect(() => {
    if (editor && formData.description !== editor.getHTML()) {
      editor.commands.setContent(formData.description);
    }
  }, [formData.description, editor]);

  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Yakin ingin menghapus portofolio ini?')) return;
    try {
      // PERBAIKAN 2: Endpoint API yang benar untuk admin
      await api.delete(`/users/admin/portfolios/${id}`);
      alert('Portofolio berhasil dihapus');
      fetchPortfolios();
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      alert(err.response?.data?.message || 'Gagal menghapus portofolio');
    }
  }, [fetchPortfolios]);

  const openEditModal = (portfolio) => {
    setEditPortfolio(portfolio);
    setFormData({
      title: portfolio.title || '',
      description: portfolio.description || '',
      category: portfolio.category || '',
      clientMessage: portfolio.clientMessage || '',
      newMediaFiles: [],
      // PERBAIKAN 3: Pastikan existingMedia selalu array URL lengkap dari backend
      existingMedia: (portfolio.media || []).map(url => {
        // Asumsi: backend mengembalikan URL lengkap. Jika tidak, tambahkan BASE_URL di sini.
        // Contoh: return url.startsWith('http') ? url : `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}/${url}`;
        return url;
      }),
    });
    setIsEditing(true);
    editor?.commands.setContent(portfolio.description || '');
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditPortfolio(null);
    setFormData({
      title: '', description: '', category: '', clientMessage: '',
      newMediaFiles: [], existingMedia: [],
    });
    editor?.commands.setContent('');
  };

  const openAddModal = () => {
    setFormData({
      title: '', description: '', category: '', clientMessage: '',
      newMediaFiles: [], existingMedia: [],
    });
    setIsAdding(true);
    editor?.commands.setContent('');
  };

  const closeAddModal = () => {
    setIsAdding(false);
    setFormData({
      title: '', description: '', category: '', clientMessage: '',
      newMediaFiles: [], existingMedia: [],
    });
    editor?.commands.setContent('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      newMediaFiles: Array.from(e.target.files),
    }));
  };

  const handleUpdatePortfolio = useCallback(async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('clientMessage', formData.clientMessage);
      
      if (formData.newMediaFiles.length > 0) {
        formData.newMediaFiles.forEach((file) => data.append('media', file));
      } else {
        // PERBAIKAN 4: Pastikan existingMedia dikirim sebagai JSON string yang valid
        // Ini akan di-parse di backend
        data.append('media', JSON.stringify(formData.existingMedia));
      }

      // PERBAIKAN 5: Endpoint API yang benar untuk admin
      await api.put(`/users/admin/portfolios/${editPortfolio._id}`, data);

      alert('Portofolio berhasil diupdate');
      closeEditModal();
      fetchPortfolios();
    } catch (err) {
      console.error('Error updating portfolio:', err);
      alert(err.response?.data?.message || 'Gagal mengupdate portofolio');
    }
  }, [formData, editPortfolio, closeEditModal, fetchPortfolios]);

  const handleAddPortfolio = useCallback(async (e) => {
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

      // PERBAIKAN 6: Endpoint API yang benar untuk admin
      await api.post('/users/admin/portfolios', data);

      alert('Portofolio berhasil ditambahkan');
      closeAddModal();
      fetchPortfolios();
    } catch (err) {
      console.error('Error adding portfolio:', err);
      alert(err.response?.data?.message || 'Gagal menambahkan portofolio');
    }
  }, [formData, closeAddModal, fetchPortfolios]);

  const filteredPortfolios = portfolios.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (formData.category === '' || p.category === formData.category)
  );

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

  if (loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>;

  return (
    <div className="admin-manage-portfolios flex flex-col items-end p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-6 w-full">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">
          Manage Portfolios
        </h1>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Portfolio
        </button>
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
          {displayedPortfolios.length > 0 ? (
            displayedPortfolios.map((portfolio) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                No portfolios found
              </td>
            </tr>
          )}
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
      className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl overflow-auto max-h-[90%]"
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
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label className="block mb-1">Description</label>
      <MenuBar editor={editor} />
      <div
        className="border rounded mb-4 min-h-[150px] p-4 prose max-w-full overflow-auto"
        style={{ whiteSpace: 'normal' }}
      >
        {editor ? <EditorContent editor={editor} /> : 'Loading editor...'}
      </div>
    </div>
    <div>
      <label className="block mb-1">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      {' '}
      {/* PERBAIKAN: Aktifkan kembali input file media */}
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
      )}
  </>
);

export default ManagePortfolios;