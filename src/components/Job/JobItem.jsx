import { Link } from 'react-router-dom';

const JobItem = ({ job }) => {
  // Fungsi untuk format tanggal "DD MMM YYYY"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Tangani URL gambar thumbnail
  const thumbnailUrl = job.thumbnail
    ? (job.thumbnail.startsWith('http') ? job.thumbnail : job.thumbnail)
    : '/defaultJobThumbnail.jpg'; // ganti default jika ada

  return (
    <Link to={`/job-detail/${job._id}`} className="block">
      <div className="flex flex-col gap-5">
        <img
          src={thumbnailUrl}
          alt={job.position}
          className="rounded-lg w-full object-cover max-h-[300px] h-full bg-gray-200"
        />
        <div className="flex flex-col gap-1">
          <span className="font-Lexend text-sm font-[300] text-gray-500">
            {formatDate(job.createdAt)}
          </span>
          <h2 className="text-[24px] font-bold leading-[150%] text-black">
            {job.position}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
