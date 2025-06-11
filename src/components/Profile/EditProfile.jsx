import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Import axios instance with base URL and interceptors

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileData = location.state?.profileData || {};

  // Simpan data awal menggunakan useRef agar stabil di dependency useEffect
  const initialData = useRef({
    firstName: profileData.firstName || '',
    bio: profileData.bio || '',
    email: profileData.email || '',
    phone: profileData.contactInfo?.phone || '',
    profilePicUrl: profileData.profile || null,
  });

  // State form
  const [profilePicture, setProfilePicture] = useState(null); // file asli jika ganti foto
  const [imagePreview, setImagePreview] = useState(
    initialData.current.profilePicUrl
  );
  const [name, setName] = useState(initialData.current.firstName);
  const [description, setDescription] = useState(initialData.current.bio);
  const [email, setEmail] = useState(initialData.current.email);
  const [phone, setPhone] = useState(initialData.current.phone);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfilePicture(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Mohon upload file gambar dengan format jpg, jpeg, png, atau webp');
    }
  };

  // Cek perubahan data agar tombol aktif jika ada perubahan
  useEffect(() => {
    const hasChanges =
      name !== initialData.current.firstName ||
      description !== initialData.current.bio ||
      email !== initialData.current.email ||
      phone !== initialData.current.phone ||
      profilePicture !== null;

    setIsButtonEnabled(hasChanges);
  }, [name, description, email, phone, profilePicture]);

  // Update data profil teks saja
  const updateProfileData = async () => {
    try {
      const token = localStorage.getItem('token');

      // Siapkan payload dinamis hanya field yang berubah (atau kamu mau update)
      const payload = {};

      if (name && name !== initialData.current.firstName)
        payload.firstName = name;
      if (description && description !== initialData.current.bio)
        payload.bio = description;
      if (email && email !== initialData.current.email) payload.email = email;
      if (phone && phone !== initialData.current.phone)
        payload.contactInfo = { phone };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await api.put('/users/profile', payload);
      return response.data;
    } catch (err) {
      console.error('Response error:', err.response?.data);
      throw err;
    }
  };

  // Upload foto profil jika ada perubahan foto
  const uploadProfilePic = async () => {
    if (!profilePicture) return null;
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profilePic', profilePicture);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await api.put('/users/profile-pic', formData, config);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!isButtonEnabled) return; // prevent submit if no changes

    setLoading(true);
    setError(null);

    try {
      await updateProfileData();

      if (profilePicture) {
        await uploadProfilePic();
      }

      alert('Profil berhasil disimpan!');
      navigate('/profile');
    } catch (err) {
      // Tangani error validasi dengan lebih jelas
      if (err.response?.data?.errors) {
        const messages = err.response.data.errors
          .map((e) => `${e.param}: ${e.msg}`)
          .join(', ');
        setError(`Validation failed: ${messages}`);
      } else {
        setError(err.response?.data?.message || 'Gagal menyimpan profil');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#FFF9EF] flex items-center px-12 py-10">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px]">
          <h2 className="font-Parkinsans text-[64px] font-medium leading-[130%] text-blue-700">
            Edit Profil Kamu
          </h2>
          <p className="text-[18px] font-light leading-[180%] text-[#7F909F]">
            Perbarui informasi yang ingin orang lain lihat
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-200 text-red-700 rounded-md">{error}</div>
        )}

        <form onSubmit={handleSaveProfile} className="flex flex-col gap-12">
          {/* Informasi General */}
          <div className="flex flex-col gap-8">
            <h2 className="font-Parkinsans text-[32px] text-blue-700 leading-[150%] font-medium">
              Informasi General
            </h2>

            {/* Foto Profil */}
            <div className="flex flex-col gap-3">
              <label className="text-lg font-light text-[#7F909F]">
                Foto Profil<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-34 h-34 object-cover rounded-full bg-[#F3F3F3]"
                  />
                ) : (
                  <div className="w-34 h-34 bg-gray-200 flex items-center justify-center rounded-full">
                    {/* SVG Placeholder */}
                    <svg
                      width="137"
                      height="137"
                      viewBox="0 0 137 137"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="68.5" cy="68.5" r="68.5" fill="#F3F3F3" />
                      <rect
                        x="45"
                        y="51"
                        width="6"
                        height="36"
                        fill="#D4DADF"
                      />
                      <rect
                        x="87"
                        y="51"
                        width="6"
                        height="36"
                        fill="#D4DADF"
                      />
                      <rect
                        x="87"
                        y="45"
                        width="6"
                        height="36"
                        transform="rotate(90 87 45)"
                        fill="#D4DADF"
                      />
                      <rect
                        x="51"
                        y="93"
                        width="6"
                        height="36"
                        transform="rotate(-90 51 93)"
                        fill="#D4DADF"
                      />
                      <rect x="51" y="81" width="6" height="6" fill="#D4DADF" />
                      <rect x="51" y="81" width="6" height="6" fill="#D4DADF" />
                      <rect x="57" y="75" width="6" height="6" fill="#D4DADF" />
                      <rect x="63" y="69" width="6" height="6" fill="#D4DADF" />
                      <rect x="69" y="63" width="6" height="6" fill="#D4DADF" />
                      <rect x="75" y="69" width="6" height="6" fill="#D4DADF" />
                      <rect x="81" y="75" width="6" height="6" fill="#D4DADF" />
                      <circle
                        cx="60.25"
                        cy="60.25"
                        r="3.75"
                        stroke="#D4DADF"
                        strokeWidth="3.75"
                      />
                    </svg>
                  </div>
                )}
                <label className="cursor-pointer text-blue-700 py-3 px-7 rounded-full border border-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-300">
                  Pilih Gambar
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Nama */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="name"
                className="text-lg font-light text-[#7F909F]"
              >
                Nama<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nama Kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-[#AAB5BF]"
              />
            </div>

            {/* Deskripsi */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="description"
                className="text-lg font-light text-[#7F909F]"
              >
                Deskripsi Singkat<span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Ceritakan sedikit tentang dirimu"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-[#AAB5BF]"
              ></textarea>
            </div>
          </div>

          {/* Informasi Kontak */}
          <div className="flex flex-col gap-8">
            <h2 className="font-Parkinsans text-[32px] text-blue-700 leading-[150%] font-medium">
              Informasi Kontak
            </h2>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="email"
                className="text-lg font-light text-[#7F909F]"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tulis Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-[#AAB5BF]"
              />
            </div>

            {/* Nomor Telepon */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="phone"
                className="text-lg font-light text-[#7F909F]"
              >
                Nomor Telephone<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Tulis Nomor Telepon"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-[#AAB5BF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!isButtonEnabled || loading}
            className={`py-4 px-6 transition-all duration-300 ${
              isButtonEnabled && !loading
                ? 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            } rounded-full`}
          >
            {loading ? 'Menyimpan...' : 'Simpan Profile'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
