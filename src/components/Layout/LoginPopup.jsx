import { useNavigate } from 'react-router-dom';
import Button from '../Ui/Button';
import ImageDecoration from '../../assets/images/Login_img-decoration.svg';
import ImageDecoration2 from '../../assets/images/Login_img-decoration2.svg';

const LoginPopup = ({ isOpen, onClose, redirectOnClose = null }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    navigate('/login');
  };

  const handleCloseClick = () => {
    onClose();
    if (redirectOnClose) {
      navigate(redirectOnClose); 
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative bg-white rounded-[50px] p-[54px] w-full flex flex-col items-center gap-[42px] max-w-[574px]">
        {/* Close Button */}
        <button
          onClick={handleCloseClick} 
          className="absolute top-4 right-12 text-5xl font-normal text-gray-500 cursor-pointer"
        >
          &times;
        </button>
        <div className="text-center flex flex-col justify-center items-center gap-[60px]">
          <div className="relative inline-flex">
            <img
              src={ImageDecoration}
              alt="lock icon"
              className="w-[296px] h-[267px]"
            />
            <img
              src={ImageDecoration2}
              className="absolute bottom-[-26px] right-[-74px] max-w-[191px]"
            />
          </div>
          <div className="flex flex-col gap-3 max-w-[347px]">
            <h2 className="text-xl font-bold text-gray-800">
              Kamu Harus Masuk!
            </h2>
            <p className="font-Lexend font-[300] text-[18px] text-[#7F909F]">
              Untuk melanjutkan proses ini, kamu harus masuk terlebih dahulu.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Button variant="primary" onClick={handleLoginClick}>
            Masuk
          </Button>
          <p className="font-Lexend font-[300] text-sm text-center mt-4 ">
            Belum memiliki akun?{' '}
            <a href="/signup" className="text-(--blue) font-[500]">
              Daftar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
