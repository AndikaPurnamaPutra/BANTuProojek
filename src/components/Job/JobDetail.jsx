import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import IcArrow from '../../assets/icons/ic-arrow_right-v2.svg';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/lokers/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error('Failed to fetch job detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) return <p className="container pt-[65px] pb-[100px] text-center">Loading...</p>;

  if (!job) return <p className="container pt-[65px] pb-[100px] text-center">Lowongan tidak ditemukan.</p>;

  const thumbnailUrl = job.thumbnail
    ? (job.thumbnail.startsWith('http') ? job.thumbnail : job.thumbnail)
    : '/defaultJobThumbnail.jpg';

  return (
    <section className="job-detail pt-[65px] pb-[100px]">
      <div className="container flex flex-col gap-12">
        <div>
          <span className="font-medium text-lg text-gray-500">
            {formatDate(job.createdAt)}
          </span>
          <div className="flex items-start">
            <Link
              to="/job"
              className="text-blue-500 hover:underline mr-4 mt-6 flex shrink-0"
            >
              <img src={IcArrow} alt="Arrow" className="w-8 h-8" />
            </Link>
            <h1 className="text-[56px] font-semibold text-[var(--blue)] leading-[150%] max-xl:text-[42px]">
              {job.position}
            </h1>
          </div>
        </div>

        <div className="flex gap-[30px] max-xl:flex-col">
          <div className="w-[50%] max-xl:w-full">
            <img
              src={thumbnailUrl}
              alt={job.position}
              className="rounded-lg w-full object-cover bg-gray-200"
            />
          </div>
          <div className="w-[50%] flex flex-col gap-5 max-xl:w-full">
            <h3 className="text-[32px] leading-[130%]">{job.company}</h3>

            {/* Deskripsi dengan Tailwind Typography */}
            <div
              className="prose max-w-none text-gray-600 mt-2"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />

            {/* Persyaratan dengan Tailwind Typography */}
            <div className="mt-6 font-semibold">Persyaratan:</div>
            <div
              className="prose max-w-none text-gray-600 mt-2"
              dangerouslySetInnerHTML={{ __html: job.requirements }}
            />

            <div className="text-gray-600 text-[18px] leading-[1.6] mt-6">
              <strong>Lokasi:</strong> {job.location || '-'}
            </div>

            <div className="text-gray-600 text-[18px] leading-[1.6] mt-3">
              <strong>Gaji:</strong> Rp {job.salaryMin?.toLocaleString() || '-'} - Rp {job.salaryMax?.toLocaleString() || '-'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetail;
