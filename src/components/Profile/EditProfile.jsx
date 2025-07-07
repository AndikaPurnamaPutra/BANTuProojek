import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Import axios instance with base URL and interceptors

const EditProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Mengambil profileData dari state, atau objek kosong jika tidak ada
  const profileData = location.state?.profileData || {};

  // Simpan data awal menggunakan useRef agar stabil di dependency useEffect
  // Data ini akan diisi ulang dari backend saat komponen mount untuk memastikan selalu terbaru
  const initialData = useRef({
    firstName: profileData.firstName || '',
    bio: profileData.bio || '',
    email: profileData.email || '',
    phone: profileData.contactInfo?.phone || '',
    profilePicUrl: profileData.profilePic || null, // Pastikan ini mengambil profilePic dari respons backend
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
        setProfilePicture(file); // Simpan file asli untuk diupload
      };
      reader.readAsDataURL(file);
    } else {
      alert('Mohon upload file gambar dengan format jpg, jpeg, png, atau webp');
      // **PERBAIKAN**: Clear input dan preview jika file tidak valid
      e.target.value = null; // Clear input file
      setImagePreview(initialData.current.profilePicUrl); // Kembali ke preview awal
      setProfilePicture(null); // Reset file
    }
  };

  // Efek untuk mengambil data profil terbaru dari backend saat komponen dimuat
  useEffect(() => {
    const fetchCurrentProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect jika tidak ada token
          return;
        }
        const response = await api.get('/users/profile'); // Ambil data profil terbaru
        const currentProfile = response.data;

        // **PERBAIKAN**: Perbarui initialData useRef dengan data terbaru dari backend
        initialData.current = {
          firstName: currentProfile.firstName || '',
          bio: currentProfile.bio || '',
          email: currentProfile.email || '',
          phone: currentProfile.contactInfo?.phone || '',
          profilePicUrl: currentProfile.profilePic || null,
        };

        // Perbarui state lokal dengan data terbaru yang dimuat
        setName(initialData.current.firstName);
        setDescription(initialData.current.bio);
        setEmail(initialData.current.email);
        setPhone(initialData.current.phone);
        setImagePreview(initialData.current.profilePicUrl);
        setIsButtonEnabled(false); // Reset tombol setelah load data baru
      } catch (err) {
        console.error('Error fetching current profile:', err);
        setError(err.response?.data?.message || 'Gagal memuat data profil.');
        // Interceptor Axios di api.js sudah menangani redirect pada 401/403,
        // jadi tidak perlu `localStorage.removeItem('token'); navigate('/login');` di sini
      }
    };

    // Panggil fetchCurrentProfile jika profileData dari location.state kosong atau tidak lengkap
    // Ini memastikan data selalu terbaru jika pengguna langsung mengakses /edit-profile atau refresh
    if (
      !profileData ||
      Object.keys(profileData).length === 0 ||
      !profileData.firstName
    ) {
      fetchCurrentProfile();
    }
  }, [navigate, profileData]); // Tambahkan profileData ke dependency array

  // Cek perubahan data agar tombol aktif jika ada perubahan
  useEffect(() => {
    const hasChanges =
      name !== initialData.current.firstName ||
      description !== initialData.current.bio ||
      email !== initialData.current.email ||
      phone !== initialData.current.phone ||
      profilePicture !== null; // True jika ada file baru dipilih

    setIsButtonEnabled(hasChanges);
  }, [name, description, email, phone, profilePicture]);

  // Update data profil teks saja
  const updateProfileData = async () => {
    try {
      const payload = {};

      // **PERBAIKAN**: Kirim hanya jika ada perubahan DAN tidak kosong
      if (name !== initialData.current.firstName) {
        if (!name.trim()) throw new Error('Nama tidak boleh kosong.');
        payload.firstName = name;
      }
      if (description !== initialData.current.bio) {
        if (!description.trim())
          throw new Error('Deskripsi tidak boleh kosong.');
        payload.bio = description;
      }
      if (email !== initialData.current.email) {
        if (!email.trim()) throw new Error('Email tidak boleh kosong.');
        // **PERBAIKAN**: Tambahkan validasi format email dasar
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
          throw new Error('Format email tidak valid.');
        payload.email = email;
      }
      // **PERBAIKAN**: Kirim contactInfo sebagai objek, dan hanya jika berubah
      // Jika nomor telepon dikosongkan, kirim string kosong
      if (phone !== initialData.current.phone) {
        payload.contactInfo = { phone: phone.trim() }; // Trim phone number
      }

      // Pastikan payload tidak kosong sebelum mengirim request PUT
      if (Object.keys(payload).length === 0) {
        return null; // Tidak ada perubahan teks untuk dikirim
      }

      // **PERBAIKAN**: Axios interceptor sudah menangani Authorization header
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await api.put('/users/profile', payload, config);
      return response.data;
    } catch (err) {
      console.error('Response error:', err.response?.data);
      throw err;
    }
  };

  // Upload foto profil jika ada perubahan foto
  const uploadProfilePic = async () => {
    if (!profilePicture) return null; // Tidak ada file baru untuk diupload
    try {
      const formData = new FormData();
      formData.append('profilePic', profilePicture);

      // **PERBAIKAN**: Axios interceptor sudah menangani Authorization header
      const config = {
        headers: {
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
    if (!isButtonEnabled) return; // Mencegah submit jika tidak ada perubahan

    setLoading(true);
    setError(null);

    try {
      let updatedTextData = null;
      let updatedPicData = null;

      // Panggil updateProfileData hanya jika ada perubahan teks
      const hasTextChanges =
        name !== initialData.current.firstName ||
        description !== initialData.current.bio ||
        email !== initialData.current.email ||
        phone !== initialData.current.phone;

      if (hasTextChanges) {
        updatedTextData = await updateProfileData();
      }

      if (profilePicture) {
        // Hanya upload jika ada file baru
        updatedPicData = await uploadProfilePic();
      }

      // **PERBAIKAN**: Perbarui initialData.current dengan data terbaru
      // Menggunakan operator nullish coalescing (??) untuk fallback ke nilai lama jika API tidak mengembalikan field tertentu
      initialData.current = {
        firstName: updatedTextData?.firstName ?? name,
        bio: updatedTextData?.bio ?? description,
        email: updatedTextData?.email ?? email,
        phone: updatedTextData?.contactInfo?.phone ?? phone, // Ambil dari contactInfo
        profilePicUrl: updatedPicData?.profilePic ?? imagePreview,
      };

      // Reset profilePicture state karena sudah diupload
      setProfilePicture(null);

      alert('Profil berhasil disimpan!');
      // Tidak perlu navigate, karena data di-refresh di useEffect mount dan initialData sudah di-update
      // Anda bisa aktifkan ini jika Anda ingin memaksa navigasi kembali setelah simpan
      // navigate('/profile');
    } catch (err) {
      // Tangani error validasi dengan lebih jelas
      if (err.response?.data?.errors) {
        // Error dari express-validator (backend)
        const messages = err.response.data.errors
          .map((e) => `${e.param}: ${e.msg}`)
          .join('\n'); // **PERBAIKAN**: Gunakan \n untuk baris baru
        setError(`Validation failed:\n${messages}`);
      } else {
        // Error generik atau dari throw new Error di frontend
        setError(
          err.response?.data?.message || err.message || 'Gagal menyimpan profil'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#FFF9EF] flex items-center px-12 py-10 max-md:p-6">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px] max-md:gap-4">
          <h2 className="font-Parkinsans text-[64px] font-medium leading-[130%] text-(--blue) max-md:text-[42px]">
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
            <h2 className="font-Parkinsans text-[32px] text-(--blue) leading-[150%] font-medium">
              Informasi General
            </h2>

            {/* Foto Profil */}
            <div className="flex flex-col gap-3">
              <label className="text-lg font-light text-[#7F909F]">
                Foto Profil<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4 max-md:flex-col max-md:items-start">
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
            <h2 className="font-Parkinsans text-[32px] text-(--blue) leading-[150%] font-medium">
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
