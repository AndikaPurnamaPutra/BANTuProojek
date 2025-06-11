import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import IcArrow from '../../assets/icons/ic-arrow_right-v2.svg';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await api.get(`/artikels/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error('Gagal mengambil data artikel:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading artikel...</p>;
  if (!article)
    return <p className="text-center py-20">Artikel tidak ditemukan.</p>;

  const parseContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('###')) {
        return (
          <h3 key={index} className="text-xl font-[500] mt-4 text-(--blue)">
            {line.replace('###', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        return (
          <ul key={index} className="list-disc pl-6 mt-2 font-[300]">
            <li>{line.replace('- ', '')}</li>
          </ul>
        );
      } else if (line.trim() === '') {
        return <p key={index}>&nbsp;</p>;
      } else {
        return (
          <p key={index} className="text-[18px] leading-[1.6] mt-2 font-[300]">
            {line}
          </p>
        );
      }
    });
  };

  const getCoverImageUrl = (coverImage) => {
    if (!coverImage) return '/defaultArticleCover.jpg';
    if (coverImage.startsWith('http')) return coverImage;
    return coverImage;
  };

  return (
    <section className="pt-[65px] pb-[100px]">
      <div className="container">
        <div className="mb-8">
          <span className="font-normal text-lg text-gray-500">
            {new Date(article.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <div className="flex items-start mb-8 mt-6">
            <Link
              to="/article"
              className="text-blue-500 hover:underline mr-4 mt-6 flex shrink-0"
            >
              <img src={IcArrow} alt="Arrow" className="w-8 h-8" />
            </Link>
            <h1 className="text-[56px] font-semibold text-gray-800 leading-[150%]">
              {article.title}
            </h1>
          </div>
        </div>

        <div className="mb-[60px]">
          <img
            src={getCoverImageUrl(article.coverImage)}
            alt={article.title}
            className="rounded-lg w-full max-h-[697px] object-cover"
          />
        </div>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </section>
  );
};

export default ArticleDetail;
