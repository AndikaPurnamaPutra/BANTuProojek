import { Link, useLocation } from 'react-router-dom';

const NavLinks = ({ isLoggedIn, onShowLoginPopup, onShowLoginPopupForJob }) => {
  const location = useLocation();

  const getLinkClassName = (path) => {
    const isActive = location.pathname === path;
    return `relative transition-all duration-300 ${
      isActive ? 'text-[var(--blue)]' : 'hover:text-[var(--blue)]'
    } after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:-translate-x-1/2 after:h-[3px] after:bg-(--blue) after:rounded-md after:transition-all after:duration-300 ${
      isActive ? 'after:w-[70%]' : 'after:w-0 hover:after:w-[24px]'
    }`;
  };

  return (
    <>
      <Link to="/portfolio" className={getLinkClassName('/portfolio')}>
        Portofolio
      </Link>
      <Link to="/forum" className={getLinkClassName('/forum')}>
        Forum
      </Link>
      <Link to="/event" className={getLinkClassName('/event')}>
        Event
      </Link>
      <Link to="/article" className={getLinkClassName('/article')}>
        Artikel
      </Link>
      {isLoggedIn ? (
        <Link to="/job" className={getLinkClassName('/job')}>
          Loker
        </Link>
      ) : (
        <button
          onClick={onShowLoginPopupForJob} // panggil fungsi khusus loker
          className={`cursor-pointer bg-transparent border-none p-0 ${getLinkClassName(
            '/job'
          )}`}
          type="button"
        >
          Loker
        </button>
      )}
      <Link to="/about-us" className={getLinkClassName('/about-us')}>
        Tentang Kami
      </Link>
    </>
  );
};

export default NavLinks;
