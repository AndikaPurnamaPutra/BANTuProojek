import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const StepOne = ({ formData, handleChange, nextStep }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const { namaDepan, namaPengguna, email, password } = formData;
    setIsButtonEnabled(!!(namaDepan && namaPengguna && email && password));
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <section className="w-full bg-white flex items-center px-[50px] py-30">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px]">
          <h2 className=" font-Parkinsans text-[32px] font-medium leading-[150%] text-(--blue)">
            Buat Akun
          </h2>
          <p className="text-[18px] font-light leading-[180%] text-[#7F909F]">
            Bergabung dan wujudkan impianmu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between gap-5">
            <InputField
              label="Nama Depan"
              name="namaDepan"
              placeholder="Tuliskan nama depan"
              value={formData.namaDepan}
              handleChange={handleChange}
            />
            <InputField
              label="Nama Pengguna"
              name="namaPengguna"
              placeholder="Tuliskan nama pengguna"
              value={formData.namaPengguna}
              handleChange={handleChange}
            />
          </div>

          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="Tuliskan email"
            value={formData.email}
            handleChange={handleChange}
          />

          <div className="flex flex-col gap-3">
            <label
              htmlFor="password"
              className="text-lg font-light text-[#7F909F]"
            >
              Kata Sandi<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="6+ karakter"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[64px] placeholder:text-[#AAB5BF]"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <EyeOffIcon className="w-6 h-6 text-gray-500" />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-4.5 rounded-full transition-all duration-300 ${
              isButtonEnabled
                ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer'
                : 'bg-[#AAB5BF] cursor-not-allowed'
            } text-white`}
            disabled={!isButtonEnabled}
          >
            Daftar
          </button>
        </form>

        <div className="text-center">
          <p className="text-[18px] font-light text-[#7F909F]">
            Sudah punya akun?{' '}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Masuk
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

const InputField = ({
  label,
  name,
  placeholder,
  value,
  handleChange,
  type = 'text',
}) => (
  <div className="flex flex-col gap-3 w-full">
    <label htmlFor={name} className="text-lg font-light text-[#7F909F]">
      {label}
      <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[64px] placeholder:text-[#AAB5BF]"
    />
  </div>
);

export default StepOne;
