import React, { useEffect, useState } from 'react';
import JobItem from '../components/Job/JobItem';
import api from '../services/api'; // axios instance

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/lokers');
        setJobs(res.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="job pt-[65px] pb-[100px]">
        <div className="container text-center">Loading lowongan kerja...</div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="job pt-[65px] pb-[100px]">
        <div className="container text-center">Belum ada lowongan kerja.</div>
      </section>
    );
  }

  return (
    <section className="job pt-[65px] pb-[100px] min-h-screen">
      <div className="container">
        <div className="flex flex-col gap-12 max-md:gap-8">
          <div className="relative inline-flex w-fit">
            <h1 className="text-[108px] leading-[130%] text-[var(--blue)] font-medium max-xl:text-7xl max-md:text-5xl">
              Info Loker
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobItem key={job._id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Job;
