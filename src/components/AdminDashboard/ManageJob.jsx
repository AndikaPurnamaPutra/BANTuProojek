import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';

// MenuBar component untuk Tiptap editor
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

const ManageJob = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const [formData, setFormData] = useState({
    position: '',
    company: '',
    description: '',
    requirements: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    thumbnail: null,
    existingThumbnail: '',
  });

  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Penanganan otorisasi di frontend: hanya admin yang bisa akses halaman ini
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      alert('Anda tidak memiliki izin untuk mengakses halaman ini.');
      navigate('/');
    }
  }, [navigate]);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/lokers');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      alert(err.response?.data?.message || 'Gagal mengambil data job');
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
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm('Yakin ingin menghapus job ini?')) return;
      try {
        await api.delete(`/lokers/${id}`);
        alert('Job berhasil dihapus');
        fetchJobs();
      } catch (err) {
        console.error('Error deleting job:', err);
        alert(err.response?.data?.message || 'Gagal menghapus job');
      }
    },
    [fetchJobs]
  );

  const openEditModal = (job) => {
    setEditJob(job);
    setFormData({
      position: job.position || '',
      company: job.company || '',
      description: job.description || '',
      requirements: job.requirements || '',
      location: job.location || '',
      salaryMin: job.salaryMin || '',
      salaryMax: job.salaryMax || '',
      thumbnail: null,
      existingThumbnail: job.thumbnail || '',
    });
    setIsEditing(true);
    editorDescription?.commands.setContent(job.description || '');
    editorRequirements?.commands.setContent(job.requirements || '');
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditJob(null);
    resetForm();
    editorDescription?.commands.setContent('');
    editorRequirements?.commands.setContent('');
  };

  const openAddModal = () => {
    resetForm();
    setIsAdding(true);
    editorDescription?.commands.setContent('');
    editorRequirements?.commands.setContent('');
  };

  const closeAddModal = () => {
    setIsAdding(false);
    resetForm();
    editorDescription?.commands.setContent('');
    editorRequirements?.commands.setContent('');
  };

  const resetForm = () => {
    setFormData({
      position: '',
      company: '',
      description: '',
      requirements: '',
      location: '',
      salaryMin: '',
      salaryMax: '',
      thumbnail: null,
      existingThumbnail: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const editorDescription = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  const editorRequirements = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: formData.requirements,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, requirements: editor.getHTML() }));
    },
  });

  useEffect(() => {
    if (
      editorDescription &&
      formData.description !== editorDescription.getHTML()
    ) {
      editorDescription.commands.setContent(formData.description);
    }
  }, [formData.description, editorDescription]);

  useEffect(() => {
    if (
      editorRequirements &&
      formData.requirements !== editorRequirements.getHTML()
    ) {
      editorRequirements.commands.setContent(formData.requirements);
    }
  }, [formData.requirements, editorRequirements]);

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: e.target.files[0] || null,
    }));
  };

  const handleUpdateJob = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const data = new FormData();
        data.append('position', formData.position);
        data.append('company', formData.company);
        data.append('description', formData.description);
        data.append('requirements', formData.requirements);
        data.append('location', formData.location);
        if (formData.salaryMin) data.append('salaryMin', formData.salaryMin);
        if (formData.salaryMax) data.append('salaryMax', formData.salaryMax);
        if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);

        await api.put(`/lokers/${editJob._id}`, data);

        alert('Job berhasil diupdate');
        closeEditModal();
        fetchJobs();
      } catch (err) {
        console.error('Error updating job:', err);
        alert(err.response?.data?.message || 'Gagal mengupdate job');
      }
    },
    [formData, editJob, closeEditModal, fetchJobs]
  );

  const handleAddJob = useCallback(
    async (e) => {
      e.preventDefault();

      if (!formData.thumbnail) {
        alert('Harap upload thumbnail media');
        return;
      }

      try {
        const data = new FormData();
        data.append('position', formData.position);
        data.append('company', formData.company);
        data.append('description', formData.description);
        data.append('requirements', formData.requirements);
        data.append('location', formData.location);
        if (formData.salaryMin) data.append('salaryMin', formData.salaryMin);
        if (formData.salaryMax) data.append('salaryMax', formData.salaryMax);
        data.append('thumbnail', formData.thumbnail);

        await api.post('/lokers', data);

        alert('Job berhasil ditambahkan');
        closeAddModal();
        fetchJobs();
      } catch (err) {
        console.error('Error adding job:', err);
        alert(err.response?.data?.message || 'Gagal menambahkan job');
      }
    },
    [formData, closeAddModal, fetchJobs]
  );

  const filteredJobs = jobs.filter((job) =>
    job.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        Loading...
      </div>
    );

  return (
    <div className="admin-manage-jobs p-6 w-full max-w-7xl mx-auto flex flex-col">
      <div className="flex justify-between items-center mb-6 w-full">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">Manage Jobs</h1>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Job
        </button>
      </div>

      <div className="mb-4 w-full flex">
        <input
          type="text"
          placeholder="Search position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b">Position</th>
            <th className="py-3 px-6 border-b">Company</th>
            <th className="py-3 px-6 border-b">Location</th>
            <th className="py-3 px-6 border-b">Salary Range</th>
            <th className="py-3 px-6 border-b">Thumbnail</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedJobs.map((job) => (
            <tr key={job._id}>
              <td className="py-3 px-6 border-b">{job.position}</td>
              <td className="py-3 px-6 border-b">{job.company}</td>
              <td className="py-3 px-6 border-b">{job.location}</td>
              <td className="py-3 px-6 border-b">
                {job.salaryMin && job.salaryMax
                  ? `${job.salaryMin} - ${job.salaryMax}`
                  : '-'}
              </td>
              <td className="py-3 px-6 border-b">
                {job.thumbnail ? (
                  <img
                    src={job.thumbnail}
                    alt="thumbnail"
                    className="w-20 h-20 object-cover rounded"
                  />
                ) : (
                  '-'
                )}
              </td>
              <td className="py-3 px-6 border-b space-x-4 whitespace-nowrap">
                <button
                  onClick={() => openEditModal(job)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
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
          title={isEditing ? 'Edit Job' : 'Add New Job'}
          onClose={isEditing ? closeEditModal : closeAddModal}
          onSubmit={isEditing ? handleUpdateJob : handleAddJob}
        >
          <JobForm
            formData={formData}
            onChange={handleInputChange}
            onFileChange={handleFileChange}
            isEditing={isEditing}
            editorDescription={editorDescription}
            editorRequirements={editorRequirements}
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

const JobForm = ({
  formData,
  onChange,
  onFileChange,
  isEditing,
  editorDescription,
  editorRequirements,
}) => (
  <>
    <div>
      <label className="block mb-1 font-semibold">Position</label>
      <input
        type="text"
        name="position"
        value={formData.position}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-semibold">Company</label>
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={onChange}
        required
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div>
      <label className="block mb-1 font-semibold">Description</label>
      <MenuBar editor={editorDescription} />
      <div
        className="border rounded mb-4 min-h-[150px] p-4 prose max-w-full overflow-auto"
        style={{ whiteSpace: 'normal' }}
      >
        {editorDescription ? (
          <EditorContent editor={editorDescription} />
        ) : (
          'Loading editor...'
        )}
      </div>
    </div>

    <div>
      <label className="block mb-1 font-semibold">Requirements</label>
      <MenuBar editor={editorRequirements} />
      <div
        className="border rounded mb-4 min-h-[150px] p-4 prose max-w-full overflow-auto"
        style={{ whiteSpace: 'normal' }}
      >
        {editorRequirements ? (
          <EditorContent editor={editorRequirements} />
        ) : (
          'Loading editor...'
        )}
      </div>
    </div>

    <div>
      <label className="block mb-1 font-semibold">Location</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex space-x-4">
      <div className="flex-1">
        <label className="block mb-1 font-semibold">Salary Min</label>
        <input
          type="number"
          name="salaryMin"
          value={formData.salaryMin}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
        />
      </div>
      <div className="flex-1">
        <label className="block mb-1 font-semibold">Salary Max</label>
        <input
          type="number"
          name="salaryMax"
          value={formData.salaryMax}
          onChange={onChange}
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="0"
        />
      </div>
    </div>

    <div>
      <label className="block mb-1 font-semibold">
        Upload Thumbnail Media {isEditing ? '(Optional)' : '(Required)'}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="w-full"
      />
    </div>

    {isEditing && formData.existingThumbnail && (
      <div className="mt-2">
        <p>Existing Thumbnail:</p>
        <img
          src={formData.existingThumbnail}
          alt="existing thumbnail"
          className="w-32 h-32 object-cover rounded"
        />
      </div>
    )}
  </>
);

export default ManageJob;
