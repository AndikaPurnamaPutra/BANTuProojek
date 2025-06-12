import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { login, getProfile } from '../services/userService'; // import fungsi login API
import LoginBackground from '../assets/images/login_bg.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsButtonEnabled(email.trim() !== '' && password.trim() !== '');
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(email, password);

      // Simpan token ke localStorage
      localStorage.setItem('token', res.data.token);

      // Simpan data user ke localStorage
      let userData = res.data.user;

      if (!userData) {
        // Jika user tidak ada di response login, ambil dari endpoint profile
        const profileRes = await getProfile();
        userData = profileRes.data;
      }

      // Simpan user lengkap ke localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Simpan role dan id secara terpisah untuk akses mudah
      if (userData.role)
        localStorage.setItem('userRole', userData.role.toLowerCase());
      if (userData._id) localStorage.setItem('userId', userData._id);

      // Dispatch event supaya komponen lain tahu login sudah berhasil
      window.dispatchEvent(new Event('storageUpdated'));

      // Redirect ke homepage
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Email atau Password salah');
    }
  };

  return (
    <section>
      <div className="max-w-[1440px] mx-auto">
        <div className="flex max-xl:min-h-screen">
          <div className="max-w-[640px] shrink-0 min-h-screen max-xl:hidden">
            <img
              src={LoginBackground}
              className="w-full h-full object-cover"
              alt="Login Background"
            />
          </div>
          <div className="w-full bg-white flex items-center px-[50px]">
            <div className="w-full flex flex-col gap-12.5">
              <div className="flex flex-col gap-5 border-b-[1px] border-[#D4DADF] pb-[30px]">
                <h2 className="font-Parkinsans text-[32px] text-(--blue) leading-[150%] font-medium">
                  Welcome Back!
                </h2>
                <p className="text-[18px] font-[300] leading-[180%]">
                  Yeay kamu datang lagi, saatnya berkarya
                </p>
              </div>

              {error && (
                <div className="p-5 bg-red-100 border border-red-300 text-red-600 font-light text-center rounded-md">
                  <p>{error}</p>
                </div>
              )}

              <div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-12.5 flex flex-col gap-3 max-lg:mb-8">
                    <label
                      htmlFor="email"
                      className="text-lg font-light leading-[180%] text-[#7F909F]"
                    >
                      Email
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="block w-full px-4 py-4 border border-[#D4DADF] rounded-md text-lg font-[300] focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[64px] placeholder-text-[#AAB5BF] focus:text-black"
                      placeholder="Tuliskan email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-12.5 flex flex-col gap-3 relative max-lg:mb-8">
                    <label
                      htmlFor="password"
                      className="text-lg font-light leading-[180%] text-[#7F909F]"
                    >
                      Kata Sandi<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        className="block w-full px-4 py-4 border border-[#D4DADF] focus:border-0 rounded-md text-lg font-[300] focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[64px] placeholder-text-[#AAB5BF] focus:text-black"
                        placeholder="6+ karakter"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-xl"
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
                    className={`w-full py-4.5 rounded-full cursor-pointer ${
                      isButtonEnabled
                        ? 'bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in'
                        : 'bg-[#AAB5BF]'
                    } text-white`}
                    disabled={!isButtonEnabled}
                  >
                    Masuk
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p className="text-[18px] font-[300] leading-[180%] text-[#7F909F]">
                    Belum punya akun?{' '}
                    <a
                      href="/register"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      Daftar
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
