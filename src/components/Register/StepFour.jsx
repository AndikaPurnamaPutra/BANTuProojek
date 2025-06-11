import React, { useState, useEffect } from 'react';

const StepFour = ({
  formData,
  handleCategoriesChange,
  prevStep,
  handleFinish, error
}) => {
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

  // State lokal untuk kontrol checkbox
  const [selectedCategories, setSelectedCategories] = useState(
    formData.categories || []
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Handle checkbox toggle
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((item) => item !== value));
    }
  };

  // Kirim update ke induk setiap kali kategori berubah
  useEffect(() => {
    handleCategoriesChange(selectedCategories);
    setIsButtonEnabled(selectedCategories.length > 0);
  }, [selectedCategories, handleCategoriesChange]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFinish(); // Data sudah tersimpan di induk, tinggal submit
  };

  return (
    <section className="w-full bg-white flex items-center px-[50px] py-30">
      <div className="flex flex-col gap-8 w-full">
        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-600 text-center rounded">
            {error}
          </div>
        )}
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px]">
          <h2 className="font-Parkinsans text-[32px] font-medium leading-[150%] text-[var(--blue)]">
            Kamu Fokus di Bidang Apa?
          </h2>
          <p className="text-[18px] font-light leading-[180%] text-[#7F909F]">
            Bisa pilih lebih dari satu
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between gap-6 min-h-[50vh]"
        >
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((category) => (
              <div key={category} className="inline-flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  name="categories"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                  className="hidden"
                  aria-checked={selectedCategories.includes(category)}
                />
                <label
                  htmlFor={category}
                  className={`py-3 px-6 border transition-all duration-300 ${
                    selectedCategories.includes(category)
                      ? 'border-[var(--blue)] text-[var(--blue)]'
                      : 'border-[#D4DADF] text-[#7F909F]'
                  } rounded-full cursor-pointer`}
                >
                  {category}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="py-3 px-6 border border-[#D4DADF] text-[#7F909F] rounded-full"
            >
              Kembali
            </button>
            <button
              type="submit"
              disabled={!isButtonEnabled}
              className={`py-3 px-6 transition-all duration-300 ${
                isButtonEnabled
                  ? 'bg-[var(--blue)] hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } rounded-full`}
            >
              Selesai
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StepFour;
