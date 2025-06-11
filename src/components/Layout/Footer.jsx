import { Link } from 'react-router-dom';
import logo from '../../assets/logos/logo_brand.svg';
import NavLinks from './NavLinks';
import Button from '../Ui/Button';

const Footer = () => {
  return (
    <>
      <footer className=" py-10 border-t border-[#F3F3F3]">
        <div className="container">
          <div className="content flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={logo} className="max-w-[108px] w-full" alt="Logo" />
            </Link>
            <div className="content-menu flex items-center justify-between gap-[60px]">
              <NavLinks />
            </div>
            <Button to="/profile" variant="link">
              Kontak
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
