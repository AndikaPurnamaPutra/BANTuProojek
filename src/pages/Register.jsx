import React, { useState, useCallback } from 'react';
import StepOne from '../components/Register/StepOne';
import StepTwo from '../components/Register/StepTwo';
import StepThree from '../components/Register/StepThree';
import StepFour from '../components/Register/StepFour';
import LoginBackground from '../assets/images/login_bg.webp';
import { register } from '../services/userService';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    namaDepan: '',
    namaPengguna: '',
    email: '',
    password: '',
    deskripsi: '',
    profilePicture: null,
    role: 'designer',
    categories: [],
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const nextStep = () => {
    setError(null);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({ ...prev, profilePicture: file }));
  };

  const handleCategoriesChange = useCallback((categories) => {
    setFormData((prev) => ({ ...prev, categories }));
  }, []);

  const handleFinish = () => {
    if (
      !formData.namaDepan ||
      !formData.namaPengguna ||
      !formData.email ||
      !formData.password ||
      !formData.role ||
      !formData.profilePicture ||
      !formData.deskripsi || 
      formData.categories.length === 0
    ) {
      setError(
        'Mohon lengkapi semua data dan pilih kategori serta foto profil.'
      );
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('firstName', formData.namaDepan);
    data.append('username', formData.namaPengguna);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('bio', formData.deskripsi);
    data.append('role', formData.role);
    data.append('subCategory', JSON.stringify(formData.categories));
    data.append('profilePic', formData.profilePicture);

    register(data)
      .then((res) => {
        setError(null);
        setLoading(false);
        window.location.href = '/login'; // langsung ke halaman login
      })
      .catch((err) => {
        console.error(err);
        setError(
          err.response?.data?.message ||
            'Registration failed. Please try again.'
        );
        setLoading(false);
      });
  };

  return (
    <>
      <section className="max-w-[1440px] mx-auto">
        <div className="flex max-xl:min-h-screen">
          <div className="max-w-[640px] shrink-0 min-h-screen max-xl:hidden">
            <img
              src={LoginBackground}
              className="w-full h-full object-cover"
              alt="Login Background"
            />
          </div>

          {step === 1 && (
            <StepOne
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 4 && (
            <StepFour
              formData={formData}
              prevStep={prevStep}
              handleFinish={handleFinish}
              handleCategoriesChange={handleCategoriesChange}
              loading={loading}
              error={error}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default Register;
