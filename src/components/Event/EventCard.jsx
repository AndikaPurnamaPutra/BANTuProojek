import { Link } from 'react-router-dom';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import IcAddress from '../../assets/images/ic_location-line.svg';
import IcTime from '../../assets/images/ic_time-line.svg';
import IcContact from '../../assets/images/ic_baseline-whatsapp.svg';

const EventCard = ({
  id,
  title,
  description,
  location,
  time,
  contact,
  date,
  thumbnail,
}) => {
  const imgSrc = thumbnail
    ? thumbnail.startsWith('http')
      ? thumbnail
      : thumbnail
    : '/defaultEventThumbnail.jpg';

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Link to={`/event/${id}`} className="no-underline text-inherit">
      <div className="card-event border-t-[1px] border-[#E5E5E5] flex flex-col justify-between gap-5 pt-[20px] hover:opacity-90 transition-all duration-200">
        <h3 className="font-Parkinsans text-[28px] leading-[150%] font-[500] text-(--blue) max-md:text-[24px]">
          {title}
        </h3>
        <div className="flex flex-col gap-5">
          <img
            src={imgSrc}
            alt={title}
            className="object-cover w-full rounded-md"
          />
          <div className="flex flex-col gap-3">
            <div
              className="prose prose-lg max-h-[5.2rem] overflow-hidden text-ellipsis"
              style={{
                WebkitLineClamp: 2,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
            <div className="flex flex-col mt-2">
              <div className="inline-flex gap-2 items-center">
                <img src={IcAddress} alt="Location Icon" className="w-[20px] h-[20px]" />
                <span className="font-[300] leading-[180%] text-[#5E615E]">
                  {location || '-'}
                </span>
              </div>
              <div className="inline-flex gap-2 items-center">
                <img src={IcTime} alt="Time Icon" className="w-[20px] h-[20px]" />
                <span className="font-[300] leading-[180%] text-[#5E615E]">
                  {time ? `${time} - Selesai` : '-'}
                </span>
              </div>
              <div className="inline-flex gap-2 items-center">
                <img src={IcContact} alt="Contact Icon" className="w-[20px] h-[20px]" />
                <span className="font-[300] leading-[180%] text-[#5E615E]">
                  {contact || '-'}
                </span>
              </div>
              <div className="inline-flex gap-2 items-center">
                <CalendarDaysIcon className="w-5 h-5 text-(--blue)" />
                <span className="font-[300] leading-[180%] text-[#5E615E]">
                  {formatDate(date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
