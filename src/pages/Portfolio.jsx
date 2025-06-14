import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PortfolioTabs from '../components/Portfolio/PortfolioTabs';
import PortfolioItem from '../components/Portfolio/PortfolioItem';
import api from '../services/api';

const Portfolio = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setActiveCategory(category.toLowerCase());
  }, [searchParams]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioData, setPortfolioData] = useState([]);
  const [error, setError] = useState(null);

  // Ambil data portofolio dari backend sekali saat mount
  useEffect(() => {
    const fetchPortfolios = async () => {
      console.log('Backend base URL:', import.meta.env.VITE_API_BASE_URL);
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/portfolios');
        setPortfolioData(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch portfolios:', err);
        setError('Gagal memuat portofolio.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  // Reset visibleCount tiap kali kategori berubah
  useEffect(() => {
    setVisibleCount(activeCategory === 'all' ? 20 : 6);
  }, [activeCategory]);

  // Filter portofolio berdasarkan kategori dan pencarian (case insensitive)
  const filtered = portfolioData.filter((item) => {
    const categoryMatch =
      activeCategory === 'all' ||
      (item.category && item.category.toLowerCase() === activeCategory);

    const searchMatch =
      item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Batasi data yang tampil sesuai visibleCount (infinite scroll)
  const visibleItems = filtered.slice(0, visibleCount);

  // Infinite scroll: tambah visibleCount saat scroll ke bawah
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (
        scrollY + viewportHeight >= scrollHeight - 100 &&
        !isLoading &&
        visibleCount < filtered.length
      ) {
        setIsLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 8, filtered.length));
          setIsLoading(false);
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, visibleCount, filtered.length]);

  return (
    <section className="px-6 py-16 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-5xl font-bold text-[var(--blue)] mb-6 max-md:text-4xl">
          Portofolio
        </h1>

        {/* Tabs dan Search */}
        <div className="flex flex-col xl:flex-row justify-between items-start md:items-center gap-4 mb-10 max-lg:flex-col-reverse">
          <PortfolioTabs active={activeCategory} onChange={setActiveCategory} />

          <div className="relative w-full xl:w-64">
            <input
              type="text"
              placeholder="Cari portofolio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--blue)"
              aria-label="Cari portofolio"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Pesan error jika gagal load data */}
        {error && (
          <p className="text-red-500 mb-4 text-center" role="alert">
            {error}
          </p>
        )}

        {/* Grid Portofolio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {!isLoading && visibleItems.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              Tidak ada portofolio yang cocok.
            </p>
          ) : (
            visibleItems.map((item) => (
              <PortfolioItem
                key={item._id}
                id={item._id}
                image={
                  item.media && item.media.length > 0
                    ? item.media[0]
                    : 'defaultPortfolioImg.jpg'
                }
                title={item.title}
                author={
                  item.creatorID?.firstName ||
                  item.creatorID?.username ||
                  'Unknown'
                }
                profile={
                  item.creatorID?.profilePic
                    ? item.creatorID.profilePic
                    : 'defaultProfilePic.jpg'
                }
                likes={item.likesCount || 0}
                initialLiked={item.initialLiked || false}
              />
            ))
          )}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center items-center mt-10 gap-2 text-sm text-gray-500">
            <div className="w-6 h-6 border-4 border-[var(--blue)] border-t-transparent rounded-full animate-spin" />
            <span>Memuat lebih banyak...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
