import React, { useState, useEffect } from 'react';
import ArticleItem from '../components/Article/ArticleItem';
import { fetchArticles } from '../services/articleService';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await fetchArticles();
        setArticles(res.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) return <p className="text-center py-20">Loading articles...</p>;

  if (!articles.length)
    return <p className="text-center py-20">Belum ada artikel tersedia.</p>;

  return (
    <>
      <section className='min-h-screen'>
        <div className="container">
          <div className="flex flex-col gap-[50px] pt-[65px] pb-[100px]">
            <div className="relative inline-flex w-fit">
              <h1 className="text-[108px] leading-[130%] text-[var(--blue)] font-medium">
                Artikel
              </h1>
              {/* Jika mau pasang dekorasi bisa di sini */}
              {/* <img src={ArticleDecoration} alt="Decoration" /> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleItem
                  key={article._id}
                  id={article._id}
                  image={article.coverImage ? article.coverImage : '/defaultArticleCover.jpg'}
                  date={new Date(article.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  title={article.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Article;
