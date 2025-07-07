import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Ui/Button';
import LoginPopup from '../Layout/LoginPopup';
import SuccessMessagePopup from '../Layout/SuccessMessagePopup';
import api from '../../services/api'; // Import instance Axios yang telah dikonfigurasi

const PortfolioFormHire = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Ekstrak author dan designerID dari state
  const author = state?.author || 'Unknown Author';
  const designerID = state?.designerID; // Dapatkan designerID dari state

  const alertShown = useRef(false); // ref untuk menandai alert peran sudah tampil

  const [formData, setFormData] = useState({
    judulProyek: '',
    deskripsi: '',
    estimasiPengerjaan: '',
    estimasiAnggaranMin: '',
    estimasiAnggaranMax: '',
  });

  const [errors, setErrors] = useState({});
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Batasi akses hanya artisan
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (!token) {
      setShowLoginPopup(true);
      return;
    }

    // Jika pengguna bukan artisan dan pesan belum ditampilkan
    if (role !== 'artisan' && !alertShown.current) {
      alertShown.current = true; // Tandai pesan sudah muncul
      alert('Hanya artisan yang bisa mengakses halaman ini.');
      navigate('/portfolio');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Filter input hanya angka untuk estimasiAnggaranMin dan estimasiAnggaranMax
    // if (
    //   (name === 'estimasiAnggaranMin' || name === 'estimasiAnggaranMax') &&
    //   /[^0-9]/.test(value)
    // ) {
    //   return; // Jangan perbarui state jika karakter non-angka dimasukkan
    // }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.judulProyek)
      newErrors.judulProyek = 'Judul proyek wajib diisi';
    if (!formData.deskripsi)
      newErrors.deskripsi = 'Deskripsi proyek wajib diisi';
    if (!formData.estimasiPengerjaan)
      newErrors.estimasiPengerjaan = 'Estimasi pengerjaan wajib diisi';
    if (
      !formData.estimasiAnggaranMin ||
      isNaN(formData.estimasiAnggaranMin) ||
      Number(formData.estimasiAnggaranMin) < 100000
    ) {
      newErrors.estimasiAnggaranMin =
        'Estimasi anggaran minimal harus lebih dari atau sama dengan 100.000';
    }
    if (
      formData.estimasiAnggaranMax &&
      Number(formData.estimasiAnggaranMax) <
        Number(formData.estimasiAnggaranMin)
    ) {
      newErrors.estimasiAnggaranMax =
        'Anggaran maksimal harus lebih besar dari anggaran minimal';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId'); // Anda mungkin masih butuh ini untuk beberapa logika frontend, tapi tidak untuk dikirim ke backend

    if (!token || userRole !== 'artisan') {
      alert('Anda harus login sebagai artisan untuk membuat proyek.');
      setShowLoginPopup(true);
      return;
    }

    if (!validateForm()) return;

    // const token = localStorage.getItem('token');
    // const artisanID = localStorage.getItem('userId');

    // if (!token) {
    //   setShowLoginPopup(true);
    //   return;
    // }

    // if (!artisanID) {
    //   alert('User ID tidak ditemukan, silakan login ulang.');
    //   return;
    // }

    if (!designerID) {
      alert(
        'ID Desainer tidak ditemukan. Kembali ke halaman portofolio dan coba lagi.'
      );
      return;
    }

    try {
      // Menggunakan api.post dari Axios
      const res = await api.post('/projects', {
        judulProyek: formData.judulProyek,
        deskripsi: formData.deskripsi,
        estimasiPengerjaan: Number(formData.estimasiPengerjaan),
        estimasiAnggaranMin: Number(formData.estimasiAnggaranMin),
        estimasiAnggaranMax: formData.estimasiAnggaranMax
          ? Number(formData.estimasiAnggaranMax)
          : undefined,
        // artisanID,
        designerID, // Kirim designerID
      });

      // Axios secara otomatis melempar error untuk status non-2xx, jadi tidak perlu `if (!res.ok)`
      setShowSuccessPopup(true);
      setFormData({
        judulProyek: '',
        deskripsi: '',
        estimasiPengerjaan: '',
        estimasiAnggaranMin: '',
        estimasiAnggaranMax: '',
      });
    } catch (error) {
      // Penanganan error Axios
      alert(
        'Gagal kirim proyek: ' +
          (error.response?.data?.message ||
            error.message ||
            'Terjadi kesalahan.')
      );
      console.error(error);
    }
  };

  return (
    <>
      <section className="pt-[65px] pb-[120px] max-md:py-16">
        <div className="container">
          <div className="flex flex-col gap-12 bg-white p-12.5 rounded-[20px] max-md:p-5">
            <div className="flex items-center gap-5 max-md:flex-col max-md:items-start max-md:gap-0">
              <h1 className="text-[36px] leading-[150%] text-black">
                Buat Proyek
              </h1>
              <span className="text-(--blue) text-lg">{author}</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              {/* Judul Proyek */}
              <div className="flex flex-col gap-3">
                <label htmlFor="judulProyek" className="text-sm font-medium">
                  Judul Proyek <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="judulProyek"
                    name="judulProyek"
                    value={formData.judulProyek}
                    onChange={handleInputChange}
                    placeholder="Masukkan Judul Proyek"
                    className="p-3 border border-gray-300 rounded-md"
                  />
                  {errors.judulProyek && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.judulProyek}
                    </p>
                  )}
                </div>
              </div>

              {/* Deskripsi Proyek */}
              <div className="flex flex-col gap-3">
                <label htmlFor="deskripsi" className="text-sm font-medium">
                  Deskripsi Proyek <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col">
                  <textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    placeholder="Tuliskan Deskripsi Proyek"
                    className="p-3 border border-gray-300 rounded-md h-48"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    Isi mengenai detail proyek. Contoh: spesifikasi, tools, dll.
                  </p>
                  {errors.deskripsi && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.deskripsi}
                    </p>
                  )}
                </div>
              </div>

              {/* Estimasi Pengerjaan */}
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="estimasiPengerjaan"
                  className="text-sm font-medium"
                >
                  Estimasi Pengerjaan (hari){' '}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col">
                  <input
                    type="number"
                    id="estimasiPengerjaan"
                    name="estimasiPengerjaan"
                    value={formData.estimasiPengerjaan}
                    onChange={handleInputChange}
                    placeholder="Masukkan Estimasi Pengerjaan"
                    className="p-3 border border-gray-300 rounded-md"
                  />
                  {errors.estimasiPengerjaan && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.estimasiPengerjaan}
                    </p>
                  )}
                </div>
              </div>

              {/* Estimasi Anggaran */}
              <div className="flex flex-col">
                <label
                  htmlFor="estimasiAnggaran"
                  className="text-sm font-medium mb-3"
                >
                  Estimasi Anggaran <span className="text-red-500">*</span>
                </label>
                <div className="flex justify-between items-center gap-7 max-md:flex-col max-md:gap-4">
                  {/* Estimasi Anggaran Minimal */}
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-2 text-sm text-gray-600">
                      Rp
                    </span>
                    <input
                      type="number"
                      id="estimasiAnggaranMin"
                      name="estimasiAnggaranMin"
                      value={formData.estimasiAnggaranMin}
                      onChange={handleInputChange}
                      placeholder="Minimal"
                      className="pl-8 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>

                  <div className="w-10 h-0.5 bg-black shrink"></div>

                  {/* Estimasi Anggaran Maksimal */}
                  <div className="relative flex items-center w-full">
                    <span className="absolute left-2 text-sm text-gray-600">
                      Rp
                    </span>
                    <input
                      type="number"
                      id="estimasiAnggaranMax"
                      name="estimasiAnggaranMax"
                      value={formData.estimasiAnggaranMax}
                      onChange={handleInputChange}
                      placeholder="Maksimal"
                      className="pl-8 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>

                {/* Keterangan Minimal Anggaran */}
                {/* {formData.estimasiAnggaranMin &&
                  Number(formData.estimasiAnggaranMin) < 100000 && (
                    <p className="text-red-500 text-sm mt-2">
                      Minimal anggaran: Rp 100.000
                    </p>
                  )} */}

                {/* Keterangan Maksimal Anggaran */}
                {/* {formData.estimasiAnggaranMax &&
                  Number(formData.estimasiAnggaranMax) <
                    Number(formData.estimasiAnggaranMin) && (
                    <p className="text-red-500 text-sm mt-2">
                      Anggaran maksimal harus lebih besar dari anggaran minimal.
                    </p>
                  )} */}

                {errors.estimasiAnggaranMin && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.estimasiAnggaranMin}
                  </p>
                )}
                {errors.estimasiAnggaranMax && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.estimasiAnggaranMax}
                  </p>
                )}
              </div>

              {/* Tombol Kirim */}
              <div className="flex">
                <Button
                  type="submit"
                  variant="primary"
                  className="cursor-pointer"
                >
                  Hubungi Desainer
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Popups */}
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
      <SuccessMessagePopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />
    </>
  );
};

export default PortfolioFormHire;
