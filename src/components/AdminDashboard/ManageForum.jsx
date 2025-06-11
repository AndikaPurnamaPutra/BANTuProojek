import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ManageForum = () => {
  const navigate = useNavigate();

  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isForumModalOpen, setIsForumModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const [selectedForum, setSelectedForum] = useState(null);
  const [comments, setComments] = useState([]);

  const [forumForm, setForumForm] = useState({ title: '', description: '' });
  const [editingForum, setEditingForum] = useState(null);

  const [commentForm, setCommentForm] = useState({ content: '' });
  const [editingComment, setEditingComment] = useState(null);

  // Fetch forums
  const fetchForums = async () => {
    setLoading(true);
    try {
      const res = await api.get('/forums');
      setForums(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch forums');
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments for selected forum
  const fetchComments = async (forumID) => {
    try {
      const res = await api.get(`/comments/forum/${forumID}`);
      setComments(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch comments');
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  // Pagination logic
  const filteredForums = forums.filter((f) =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredForums.length / itemsPerPage);
  const displayedForums = filteredForums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Forum modal handlers
  const openAddForumModal = () => {
    setForumForm({ title: '', description: '' });
    setEditingForum(null);
    setIsForumModalOpen(true);
  };

  const openEditForumModal = (forum) => {
    setForumForm({ title: forum.title, description: forum.description });
    setEditingForum(forum);
    setIsForumModalOpen(true);
  };

  const closeForumModal = () => {
    setIsForumModalOpen(false);
    setEditingForum(null);
  };

  const handleForumFormChange = (e) => {
    const { name, value } = e.target;
    setForumForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForum = async (e) => {
    e.preventDefault();
    try {
      if (editingForum) {
        await api.put(`/forums/${editingForum._id}`, forumForm);
        alert('Forum updated successfully');
      } else {
        await api.post('/forums', forumForm);
        alert('Forum created successfully');
      }
      closeForumModal();
      fetchForums();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save forum');
    }
  };

  const deleteForum = async (id) => {
    if (!window.confirm('Are you sure to delete this forum and its comments?')) return;
    try {
      await api.delete(`/forums/${id}`);
      alert('Forum deleted');
      if (selectedForum && selectedForum._id === id) {
        setSelectedForum(null);
        setComments([]);
      }
      fetchForums();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete forum');
    }
  };

  // Comment modal handlers
  const openCommentModal = (forum) => {
    setSelectedForum(forum);
    setCommentForm({ content: '' });
    setEditingComment(null);
    setIsCommentModalOpen(true);
    fetchComments(forum._id);
  };

  const closeCommentModal = () => {
    setIsCommentModalOpen(false);
    setEditingComment(null);
  };

  const openEditCommentModal = (comment) => {
    setCommentForm({ content: comment.content });
    setEditingComment(comment);
    setIsCommentModalOpen(true);
  };

  const handleCommentFormChange = (e) => {
    setCommentForm({ content: e.target.value });
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!selectedForum) {
      alert('No forum selected');
      return;
    }
    try {
      if (editingComment) {
        await api.put(`/comments/${editingComment._id}`, commentForm);
        alert('Comment updated');
      } else {
        await api.post('/comments', { ...commentForm, forumID: selectedForum._id });
        alert('Comment added');
      }
      closeCommentModal();
      fetchComments(selectedForum._id);
      fetchForums(); // Update commentCount on forums
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save comment');
    }
  };

  const deleteComment = async (id) => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await api.delete(`/comments/${id}`);
      alert('Comment deleted');
      fetchComments(selectedForum._id);
      fetchForums();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  if (loading) return <div>Loading forums...</div>;

  return (
    <div className="admin-manage-forum p-6 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 w-full">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">Manage Forums</h1>
        <button
          onClick={openAddForumModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Forum
        </button>
      </div>

      <div className="mb-6 flex">
        <input
          type="text"
          placeholder="Search forum title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b">Title</th>
            <th className="py-3 px-6 border-b">Description</th>
            <th className="py-3 px-6 border-b">Comments</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedForums.length > 0 ? (
            displayedForums.map((forum) => (
              <tr key={forum._id}>
                <td
                  className="py-3 px-6 border-b cursor-pointer text-blue-600 hover:underline"
                  onClick={() => openCommentModal(forum)}
                >
                  {forum.title}
                </td>
                <td className="py-3 px-6 border-b whitespace-pre-line">{forum.description}</td>
                <td className="py-3 px-6 border-b">{forum.commentCount}</td>
                <td className="py-3 px-6 border-b space-x-4 whitespace-nowrap">
                  <button
                    onClick={() => openEditForumModal(forum)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteForum(forum._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-gray-500">
                No forums found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex space-x-2 justify-center">
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

      {/* Forum Modal */}
      {isForumModalOpen && (
        <Modal title={editingForum ? 'Edit Forum' : 'Add New Forum'} onClose={closeForumModal}>
          <form onSubmit={submitForum} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={forumForm.title}
                onChange={handleForumFormChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                name="description"
                value={forumForm.description}
                onChange={handleForumFormChange}
                rows={4}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeForumModal}
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
        </Modal>
      )}

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <Modal title={editingComment ? 'Edit Comment' : `Comments for "${selectedForum?.title}"`} onClose={closeCommentModal}>
          <div className="max-h-[300px] overflow-auto mb-4 space-y-3 border-b pb-4">
            {comments.length === 0 && <p className="text-gray-500">No comments yet.</p>}
            {comments.map((c) => (
              <div key={c._id} className="border rounded p-3 relative bg-gray-50">
                <p>{c.content}</p>
                <small className="block mt-1 text-gray-500">
                  By {c.userID?.firstName || 'Unknown'} on {new Date(c.creationDate).toLocaleString()}
                </small>
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => openEditCommentModal(c)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComment(c._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={submitComment} className="space-y-4">
            <textarea
              name="content"
              value={commentForm.content}
              onChange={handleCommentFormChange}
              rows={4}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a comment..."
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeCommentModal}
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
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg max-h-[90vh] overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  </div>
);

export default ManageForum;
