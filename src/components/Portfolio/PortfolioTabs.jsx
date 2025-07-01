import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  'all',
  'copywriter',
  'branding',
  'videography',
  'photography',
  'illustration',
  'graphic design',
  'animation',
  'art director',
  'video editing',
  'ui/ux design',
  'motion graphics',
  'social media design',
  'design manager',
];

const capitalizeWords = (str) =>
  str
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

const PortfolioTabs = ({ active, onChange }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleCategoryClick = (cat) => {
    onChange(cat);
    navigate(`/portfolio?category=${cat}`);
  };

  return (
    <div className="relative w-full max-w-[968px]">
      {showLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-linear-backword hidden md:flex"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto scrollbar-hide scroll-smooth px-8 hide-scrollbar"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`text-sm cursor-pointer capitalize whitespace-nowrap px-4 py-2 rounded-full transition-all ${
              active === cat
                ? 'bg-[var(--blue)] text-white'
                : 'text-gray-700 hover:text-[var(--blue)]'
            }`}
          >
            {capitalizeWords(cat)}
          </button>
        ))}
      </div>

      {showRight && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-linear-forword hidden md:flex"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default PortfolioTabs;
