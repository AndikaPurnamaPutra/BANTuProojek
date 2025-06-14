import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  onClick,
  className = '',
  variant = '',
  type = 'button',
}) => {
  const baseClass =
    ' transition-all duration-300 flex items-center justify-center cursor-pointer';
  const variants = {
    primary: 'rounded-full bg-(--blue) px-8 py-3 text-white hover:bg-blue-700',
    secondary: 'text-gray-700 bg-gray-200 hover:bg-gray-300 px-6 py-3',
    outline:
      'border border-(--blue) text-(--blue) hover:bg-(--blue) hover:text-white duration-300 gap-2.5 px-8 py-3 rounded-full max-md:w-full',
    link: 'px-0! py-0! rounded-none text-[var(--blue)]',
    icon: 'p-[10px]! bg-(--blue) rounded-[10px]! text-white',
  };

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClass} ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// ✅ Menambahkan PropTypes untuk validasi props
Button.propTypes = {
  children: PropTypes.node.isRequired, // Harus ada konten dalam button
  to: PropTypes.string, // URL internal (opsional)
  href: PropTypes.string, // URL eksternal (opsional)
  onClick: PropTypes.func, // Fungsi klik (opsional)
  className: PropTypes.string, // Tambahan class (opsional)
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'link']), // Hanya bisa salah satu dari ini
  type: PropTypes.oneOf(['button', 'submit', 'reset']), // Jenis button (default: "button")
};

// ✅ Menambahkan default props untuk menghindari undefined
Button.defaultProps = {
  to: undefined,
  href: undefined,
  onClick: undefined,
  className: '',
  variant: undefined,
  type: 'button',
};

export default Button;
