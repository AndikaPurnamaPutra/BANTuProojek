import React, { useState } from 'react';
import DesignerImage from '../../assets/images/register_role-designer.svg';
import ArtisanImage from '../../assets/images/register_role-artisan.svg';

const StepThree = ({ formData, handleChange, nextStep, prevStep }) => {
  const [role, setRole] = useState(formData.role || 'designer');

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep(); // Lanjut ke langkah berikutnya (misal, konfirmasi atau simpan)
  };

  return (
    <section className="w-full bg-white flex items-center px-[50px] py-30">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px]">
          <h2 className="font-Parkinsans text-[32px] font-medium leading-[150%] text-blue-700">
            Siapakah Kamu?
          </h2>
          <p className="text-[18px] font-light leading-[180%] text-[#7F909F]">
            Ceritakan lebih banyak tentang kamu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Pilihan Role */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-light text-[#7F909F]">Pilih Role</label>
            <div className="flex gap-4">
              {/* Designer Option */}
              <div className="flex flex-col items-end p-5 border border-[#D4DADF] rounded-md w-full">
                <input
                  type="radio"
                  id="designer"
                  name="role"
                  value="designer"
                  checked={role === 'designer'}
                  onChange={handleRoleChange}
                  className=""
                />
                <div className="flex items-center gap-3">
                  <img
                    src={DesignerImage}
                    className="w-17.5 h-17.5"
                    alt="Designer"
                  />
                  <div>
                    <label htmlFor="designer" className="text-lg text-black">
                      Designer
                    </label>
                    <p className="text-sm font-light text-[#7F909F]">
                      Aku mau memperkenalkan karya
                    </p>
                  </div>
                </div>
              </div>

              {/* Artisan Option */}
              <div className="flex flex-col items-end p-5 border border-[#D4DADF] rounded-md w-full">
                <input
                  type="radio"
                  id="artisan"
                  name="role"
                  value="artisan"
                  checked={role === 'artisan'}
                  onChange={handleRoleChange}
                  className=""
                />
                <div className="flex items-center gap-3 w-full">
                  <img
                    src={ArtisanImage}
                    className="w-17.5 h-17.5"
                    alt="Artisan"
                  />
                  <div>
                    <label htmlFor="artisan" className="text-lg text-black">
                      Artisan
                    </label>
                    <p className="text-sm font-light text-[#7F909F]">
                      Aku mau mencari desainer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigasi Kembali dan Selanjutnya */}
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
              className="py-3 px-6 bg-(--blue) hover:bg-blue-700 text-white rounded-full transition-all duration-300 cursor-pointer"
            >
              Selanjutnya
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default StepThree;
