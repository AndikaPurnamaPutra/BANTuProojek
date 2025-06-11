import React from 'react';
import Button from '../Ui/Button'; // Komponen Button Anda
import ImgSuccessMessageDecoration from '../../assets/images/SuccessMessage_imgDecoration.png';
import ImageDecoration2 from '../../assets/images/Login_img-decoration2.svg';

const SuccessMessagePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Jangan tampilkan modal jika isOpen false

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative bg-white rounded-[50px] pt-[52px] pb-[94px] px-[52px] w-full flex flex-col items-center gap-[42px] max-w-[574px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-12 text-5xl font-normal text-gray-500 cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center flex flex-col justify-center items-center gap-[60px]">
          <div className="relative inline-flex">
            <img
              src={ImgSuccessMessageDecoration}
              alt="success icon"
              className="w-[267px] h-[267px]"
            />
            <img
              src={ImageDecoration2}
              className="absolute bottom-[-26px] right-[-74px] max-w-[191px]"
            ></img>
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className="text-[32px] font-medium leading-[150%] text-gray-800">
              Request kamu berhasil!
            </h2>
            <p className="font-Lexend font-[300] text-[18px] text-[#7F909F] max-w-[347px]">
              Cek disini untuk lanjut ngobrol dengan desainer
            </p>
          </div>
        </div>

        <Button variant="primary" onClick={onClose}>
          Chat
        </Button>
      </div>
    </div>
  );
};

export default SuccessMessagePopup;
