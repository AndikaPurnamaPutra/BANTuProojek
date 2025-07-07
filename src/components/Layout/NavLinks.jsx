import { Link, useLocation } from 'react-router-dom';

const NavLinks = ({
  isLoggedIn,
  // onShowLoginPopup,
  // onShowLoginPopupForJob,
  onLinkClick = () => {},
}) => {
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
      <Link
        to="/portfolio"
        className={getLinkClassName('/portfolio')}
        onClick={onLinkClick}
      >
        Portofolio
      </Link>
      <Link
        to="/forum"
        className={getLinkClassName('/forum')}
        onClick={onLinkClick}
      >
        Forum
      </Link>
      <Link
        to="/event"
        className={getLinkClassName('/event')}
        onClick={onLinkClick}
      >
        Event
      </Link>
      <Link
        to="/article"
        className={getLinkClassName('/article')}
        onClick={onLinkClick}
      >
        Artikel
      </Link>
      {/* {isLoggedIn ? (
        <Link
          to="/job"
          className={getLinkClassName('/job')}
          onClick={onLinkClick}
        >
          Loker
        </Link>
      ) : (
        <button
          onClick={() => {
            onShowLoginPopupForJob();
            onLinkClick();
          }} // panggil fungsi khusus loker
          className={`cursor-pointer bg-transparent border-none p-0 ${getLinkClassName(
            '/job'
          )}`}
          type="button"
        >
          Loker
        </button>
      )} */}
      <Link // Loker selalu menjadi Link langsung
        to="/job"
        className={getLinkClassName('/job')}
        onClick={onLinkClick}
      >
        Loker
      </Link>
      <Link to="/about-us" className={getLinkClassName('/about-us')}>
        Tentang Kami
      </Link>
    </>
  );
};

export default NavLinks;
