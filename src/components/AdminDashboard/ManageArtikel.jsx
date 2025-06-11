import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit'; // sudah termasuk Code extension
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import api from '../../services/api';

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

const ManageArtikel = () => {
  const navigate = useNavigate();
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editArtikel, setEditArtikel] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    newCoverImage: null,
    existingCoverImage: '',
  });

  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Inject CSS untuk jarak antar paragraf, heading, list, blockquote
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.id = 'custom-prose-styles';
    styleTag.innerHTML = `
      .prose p {
        margin-bottom: 1rem;
      }
      .prose h1, .prose h2, .prose h3 {
        margin-top: 1.5rem;
        margin-bottom: 1rem;
        font-weight: medium;
        font-family: "Lexend", serif;
      }
      .prose ul, .prose ol {
        margin-bottom: 1rem;
        padding-left: 1.25rem;
      }
      .prose blockquote {
        margin: 1rem 0;
        padding-left: 1rem;
        border-left: 4px solid #3b82f6;
        color: #3b82f6;
        font-style: italic;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      const existingTag = document.getElementById('custom-prose-styles');
      if (existingTag) existingTag.remove();
    };
  }, []);

  const fetchArtikels = async () => {
    setLoading(true);
    try {
      const res = await api.get('/artikels');
      setArtikels(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengambil data artikel');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtikels();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      await api.delete(`/artikels/${id}`);
      alert('Artikel berhasil dihapus');
      fetchArtikels();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus artikel');
    }
  };

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link], // jangan pakai Code karena sudah termasuk StarterKit
    content: formData.content,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, content: editor.getHTML() }));
    },
  });

  // Sinkronisasi konten editor setiap kali formData.content berubah
  useEffect(() => {
    if (editor && formData.content !== editor.getHTML()) {
      editor.commands.setContent(formData.content);
    }
  }, [formData.content, editor]);

  const openEditModal = (artikel) => {
    setEditArtikel(artikel);
    setFormData({
      title: artikel.title || '',
      content: artikel.content || '',
      category: artikel.category || '',
      tags: (artikel.tags || []).join(', '),
      newCoverImage: null,
      existingCoverImage: artikel.coverImage || '',
    });
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditArtikel(null);
    resetForm();
  };

  const openAddModal = () => {
    resetForm();
    setIsAdding(true);
  };

  const closeAddModal = () => {
    setIsAdding(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '',
      tags: '',
      newCoverImage: null,
      existingCoverImage: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      newCoverImage: e.target.files[0] || null,
    }));
  };

  const handleUpdateArtikel = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      if (formData.category) data.append('category', formData.category);
      data.append(
        'tags',
        JSON.stringify(
          formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t)
        )
      );
      if (formData.newCoverImage) {
        data.append('coverImage', formData.newCoverImage);
      }

      await api.put(`/artikels/${editArtikel._id}`, data);

      alert('Artikel berhasil diupdate');
      closeEditModal();
      fetchArtikels();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengupdate artikel');
    }
  };

  const handleAddArtikel = async (e) => {
    e.preventDefault();

    if (!formData.newCoverImage) {
      alert('Harap upload cover image');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      if (formData.category) data.append('category', formData.category);
      data.append(
        'tags',
        JSON.stringify(
          formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t)
        )
      );
      data.append('coverImage', formData.newCoverImage);

      await api.post('/artikels', data);

      alert('Artikel berhasil ditambahkan');
      closeAddModal();
      fetchArtikels();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menambahkan artikel');
    }
  };

  const filteredArtikels = artikels.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (formData.category === '' ||
        a.category.toLowerCase() === formData.category.toLowerCase())
  );

  const totalItems = filteredArtikels.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedArtikels = filteredArtikels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-manage-artikels flex flex-col items-end p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-6 w-full">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">
          Manage Articles
        </h1>
      </div>

      <button
        onClick={openAddModal}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6"
      >
        + Add Article
      </button>

      <div className="mb-4 w-full flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
        <input
          type="text"
          placeholder="Search title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categoriesList.map((cat) => (
            <option key={cat} value={cat}>
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
            <th className="py-3 px-6 border-b">Description</th>
            <th className="py-3 px-6 border-b">Tags</th>
            <th className="py-3 px-6 border-b">Cover Image</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedArtikels.map((artikel) => (
            <tr key={artikel._id}>
              <td className="py-3 px-6 border-b">{artikel.title}</td>
              <td className="py-3 px-6 border-b capitalize">
                {artikel.category}
              </td>
              <td className="py-3 px-6 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap  line-clamp-3">
                <div dangerouslySetInnerHTML={{ __html: artikel.content }} />
              </td>
              <td className="py-3 px-6 border-b">
                {(artikel.tags || []).join(', ') || '-'}
              </td>
              <td className="py-3 px-6 border-b">
                {artikel.coverImage ? (
                  <img
                    src={artikel.coverImage}
                    alt="cover"
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  '-'
                )}
              </td>
              <td className="py-3 px-6 border-b space-x-4 whitespace-nowrap">
                <button
                  onClick={() => openEditModal(artikel)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(artikel._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(isEditing || isAdding) && (
        <Modal
          title={isEditing ? 'Edit Article' : 'Add New Article'}
          onClose={isEditing ? closeEditModal : closeAddModal}
          onSubmit={isEditing ? handleUpdateArtikel : handleAddArtikel}
        >
          <ArtikelForm
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
      className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-auto"
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

const ArtikelForm = ({
  formData,
  onChange,
  onFileChange,
  isEditing,
  editor,
}) => (
  <>
    <div>
      <label className="block mb-1 font-semibold">Title</label>
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
      <label className="block mb-1 font-semibold">Content</label>
      <MenuBar editor={editor} />
      <div
        className="border rounded mb-4 min-h-[250px] p-4 prose max-w-full overflow-auto"
        style={{ whiteSpace: 'normal' }}
      >
        {editor ? <EditorContent editor={editor} /> : 'Loading editor...'}
      </div>
    </div>

    <div>
      <label className="block mb-1 font-semibold">Category</label>
      <select
        name="category"
        value={formData.category}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">-- Select Category --</option>
        {categoriesList.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block mb-1 font-semibold">Tags (comma separated)</label>
      <input
        type="text"
        name="tags"
        value={formData.tags}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="e.g., design, branding"
      />
    </div>

    <div>
      <label className="block mb-1 font-semibold">
        Upload Cover Image {isEditing ? '(Optional)' : '(Required)'}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="w-full"
      />
    </div>

    {isEditing && formData.existingCoverImage && (
      <div className="mt-2">
        <p>Existing Cover Image:</p>
        <img
          src={formData.existingCoverImage}
          alt="existing cover"
          className="w-32 h-32 object-cover rounded"
        />
      </div>
    )}
  </>
);

export default ManageArtikel;
