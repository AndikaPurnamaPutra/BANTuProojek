import React, { useState, useEffect } from 'react';

const StepTwo = ({
  formData,
  handleChange,
  handleImageChange,
  nextStep,
  prevStep,
}) => {
  const [imagePreview, setImagePreview] = useState(
    formData.profilePicture || null
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

  const onImageChange = (e) => {
    const file = e.target.files[0];

    // Cek apakah file ada dan tipe file sesuai dengan yang diinginkan
    if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        handleImageChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      // Jika file tidak sesuai tipe yang diinginkan, tampilkan pesan error
      alert('Mohon upload file gambar dengan format jpg, jpeg, png, atau webp');
      e.target.value = null; // Reset input file jika tipe tidak valid
      setImagePreview(null); // Kosongkan preview
      handleImageChange(null); // Kosongkan file di formData induk
    }
  };

  // Effect untuk memeriksa apakah semua data telah diisi
  useEffect(() => {
    setIsButtonEnabled(!!(formData.deskripsi && imagePreview));
  }, [formData.deskripsi, imagePreview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <section className="w-full bg-white flex items-center px-[50px] py-30 max-md:p-7">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px] max-md:gap-2">
          <h2 className="font-Parkinsans text-[32px] font-medium leading-[150%] text-blue-700">
            Ayo Lengkapi Profil Kamu!
          </h2>
          <p className="text-[18px] font-light leading-[180%] text-[#7F909F]">
            Orang-orang harus tahu betapa kerennya kamu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                  <svg
                    width="137"
                    height="137"
                    viewBox="0 0 137 137"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="68.5" cy="68.5" r="68.5" fill="#F3F3F3" />
                    <rect x="45" y="51" width="6" height="36" fill="#D4DADF" />
                    <rect x="87" y="51" width="6" height="36" fill="#D4DADF" />
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
              <label className="cursor-pointer text-(--blue) py-3 px-7 rounded-full border border-(--blue) hover:bg-blue-700 hover:text-white transition-all duration-300">
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

          {/* Deskripsi */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="deskripsi"
              className="text-lg font-light text-[#7F909F]"
            >
              Deskripsi Singkat<span className="text-red-500">*</span>
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              placeholder="Ceritakan sedikit tentang dirimu"
              value={formData.deskripsi}
              onChange={handleChange}
              rows="4"
              className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-(--blue) placeholder-[#AAB5BF]"
              required
            ></textarea>
          </div>

          {/* Navigasi Kembali dan Selanjutnya */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="py-3 px-6 border border-[#D4DADF] text-[#7F909F] rounded-full cursor-pointer"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={!isButtonEnabled}
              className={`py-3 px-6 transition-all duration-300 ${
                isButtonEnabled
                  ? 'bg-(--blue) hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } rounded-full`}
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StepTwo;
