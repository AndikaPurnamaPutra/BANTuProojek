import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';

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
          editor.chain().focus().clearNodes().unsetAllMarks().setParagraph().run()
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

const ManageEvent = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    location: '',
    date: '',
    time: '',
    contact: '', // contact number field
    thumbnail: null,
    multimedia: [],
  });

  // Editor for description
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, description: editor.getHTML() }));
    },
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Fetch events
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter and paginate events
  const filteredEvents = events.filter((e) =>
    (e.title ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const displayedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Modal controls
  const openAddModal = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      location: '',
      date: '',
      time: '',
      contact: '',
      thumbnail: null,
      multimedia: [],
    });
    setEditingEvent(null);
    setIsModalOpen(true);
    editor?.commands.setContent('');
  };

  const openEditModal = (event) => {
    setFormData({
      title: event.title || '',
      subtitle: event.subtitle || '',
      description: event.description || '',
      location: event.location || '',
      date: event.date ? event.date.slice(0, 10) : '',
      time: event.time || '',
      contact: event.contact || '',
      thumbnail: null,
      multimedia: [],
      existingThumbnail: event.thumbnail || '',
      existingMultimedia: event.multimedia || [],
      _id: event._id,
    });
    setEditingEvent(event);
    setIsModalOpen(true);
    editor?.commands.setContent(event.description || '');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] || null }));
  };

  const handleMultimediaChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      multimedia: Array.from(e.target.files),
    }));
  };

  // Submit event form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('subtitle', formData.subtitle);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('date', formData.date);
      data.append('time', formData.time);
      data.append('contact', formData.contact);

      if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);

      if (formData.multimedia && formData.multimedia.length > 0) {
        formData.multimedia.forEach((file) => {
          data.append('multimedia', file);
        });
      }

      if (editingEvent) {
        await api.put(`/events/${editingEvent._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Event updated successfully');
      } else {
        await api.post('/events', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Event created successfully');
      }

      closeModal();
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save event');
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await api.delete(`/events/${id}`);
      alert('Event deleted');
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-manage-events p-6 w-full max-w-7xl mx-auto flex flex-col">
      <div className="flex justify-between items-center mb-6 w-full">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          &larr; Back to Dashboard
        </button>
        <h1 className="text-3xl font-semibold text-gray-800">Manage Events</h1>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Event
        </button>
      </div>

      <div className="mb-6 w-full flex">
        <input
          type="text"
          placeholder="Search events by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-6 border-b">Title</th>
            <th className="py-3 px-6 border-b">Subtitle</th>
            <th className="py-3 px-6 border-b">Date</th>
            <th className="py-3 px-6 border-b">Location</th>
            <th className="py-3 px-6 border-b">Contact</th>
            <th className="py-3 px-6 border-b">Thumbnail</th>
            <th className="py-3 px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <tr key={event._id}>
                <td className="py-3 px-6 border-b">{event.title}</td>
                <td className="py-3 px-6 border-b">{event.subtitle || '-'}</td>
                <td className="py-3 px-6 border-b">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 border-b">{event.location || '-'}</td>
                <td className="py-3 px-6 border-b">{event.contact || '-'}</td>
                <td className="py-3 px-6 border-b">
                  {event.thumbnail ? (
                    <img
                      src={event.thumbnail}
                      alt="Thumbnail"
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    '-'
                  )}
                </td>
                <td className="py-3 px-6 border-b space-x-4 whitespace-nowrap">
                  <button
                    onClick={() => openEditModal(event)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No events found
              </td>
            </tr>
          )}
        </tbody>
      </table>

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

      {isModalOpen && (
        <Modal
          title={editingEvent ? 'Edit Event' : 'Add New Event'}
          onClose={closeModal}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <MenuBar editor={editor} />
              <div className="border rounded mb-4 min-h-[250px] p-4 prose max-w-full overflow-auto">
                {editor ? (
                  <EditorContent editor={editor} />
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
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Contact Phone</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="e.g., +628123456789"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Upload Thumbnail {editingEvent ? '(Optional)' : '(Required)'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full"
              />
              {editingEvent && formData.existingThumbnail && (
                <img
                  src={formData.existingThumbnail}
                  alt="existing thumbnail"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            <div>
              <label className="block mb-1 font-semibold">
                Upload Multimedia (Photos/Videos)
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMultimediaChange}
                className="w-full"
              />
              {editingEvent &&
                formData.existingMultimedia &&
                formData.existingMultimedia.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {formData.existingMultimedia.map((mediaUrl, idx) => (
                      <div
                        key={idx}
                        className="w-20 h-20 overflow-hidden rounded border"
                      >
                        {/\.(mp4|mov|avi|mkv)$/i.test(mediaUrl) ? (
                          <video
                            controls
                            className="w-full h-full object-cover"
                          >
                            <source src={mediaUrl} />
                          </video>
                        ) : (
                          <img
                            src={mediaUrl}
                            alt={`media-${idx}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeModal}
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
      className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-3xl max-h-[90vh] overflow-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  </div>
);

export default ManageEvent;
