import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setIsButtonEnabled(username.trim() !== '' && password.trim() !== '');
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await api.post('/admin/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token); // Simpan token di localStorage
      navigate('/admin/dashboard'); // Arahkan ke dashboard admin setelah login berhasil
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login gagal, silakan coba lagi.';
      setErrorMessage(message);
      console.error('Login failed:', message);
    }
  };

  return (
    <section className="w-full bg-white flex items-center px-[50px] py-30">
      <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px]">
          <h2 className="font-Parkinsans text-[32px] font-medium leading-[150%] text-(--blue)">
            Masuk sebagai Admin
          </h2>
          <p className="text-[18px] font-light leading-[180%] text-[#7F909F]">
            Silakan masuk ke akun admin Anda untuk mengelola platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <InputField
            label="Nama Pengguna"
            name="username"
            placeholder="Tuliskan nama pengguna"
            value={username}
            handleChange={(e) => setUsername(e.target.value)}
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
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-light focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[64px] placeholder:text-[#AAB5BF]"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
                tabIndex={0}
                aria-label={
                  showPassword
                    ? 'Sembunyikan kata sandi'
                    : 'Tampilkan kata sandi'
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowPassword(!showPassword);
                  }
                }}
              >
                {showPassword ? (
                  <EyeIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <EyeOffIcon className="w-6 h-6 text-gray-500" />
                )}
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-600 font-medium">{errorMessage}</div>
          )}

          <button
            type="submit"
            className={`w-full py-4.5 rounded-full transition-all duration-300 ${
              isButtonEnabled
                ? 'bg-blue-700 hover:bg-blue-800 cursor-pointer'
                : 'bg-[#AAB5BF] cursor-not-allowed'
            } text-white`}
            disabled={!isButtonEnabled}
          >
            Masuk
          </button>
        </form>

        <div className="text-center">
          <p className="text-[18px] font-light text-[#7F909F]">
            Belum punya akun?{' '}
            <a
              href="/admin/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Daftar sebagai Admin
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

export default AdminLogin;
