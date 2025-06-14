import HeroOrnamen1 from "../../assets/images/hero-ornamen-1.svg";
import HeroOrnamen2 from "../../assets/images/hero-ornamen-2.svg";
import IcAddress from '../../assets/images/ic_location-line.svg';
import IcTime from '../../assets/images/ic_time-line.svg';
import { CalendarDaysIcon, PhoneIcon } from '@heroicons/react/24/outline';

const EventHeader = ({ title, subtitle, description, location, time, date, contact }) => {
  const defaultTitle = "Bring Your Own Projects (b.y.o.p)";
  const defaultSubtitle =
    "Designer akan membagikan portofolio dan mempresentasikan kepada artisan";
  const defaultDescription = `
    <p>Program Bring Your Own Projects adalah konsep di mana desainer
    membawa portofolio atau karya mereka untuk dipresentasikan dan
    dibagikan kepada artisan atau komunitas kreatif. Tujuan dari
    program ini adalah untuk mendorong kolaborasi kreatif, di mana
    desainer dan artisan dapat berdiskusi tentang ide, gaya, atau
    teknik untuk menghasilkan karya yang lebih inovatif.</p>
    <p>Kegiatan ini membuka peluang jaringan dan kerja sama jangka panjang antara
    desainer dan artisan. Biasanya, kegiatan meliputi presentasi
    portofolio, diskusi kelompok, atau sesi prototyping bersama.</p>
  `;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="event-header">
      <div className="container flex flex-col gap-[100px] max-lg:gap-10">
        {/* Title Section */}
        <div className="relative min-h-[612.69px] flex items-center justify-center max-xl:min-h-0">
          <h1 className="text-[108px] leading-[130%] text-center text-(--blue) relative z-[1] max-xl:text-[72px] max-md:text-[48px]">
            {title || defaultTitle}
          </h1>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0 max-xl:hidden">
            <div className="w-[239px] h-[193px] bg-[#4746ED] absolute top-0 left-0"></div>
            <div className="w-[239px] h-[148px] bg-[#DCF343] absolute top-[96px] left-[50%] transform -translate-x-1/2"></div>
            <div className="w-[239px] h-[193px] bg-[#6F96D1] absolute top-[18px] right-[45px]">
              <div className="w-[107px] h-[112px] rounded-full bg-[#BAD6EB] absolute right-[-45px] bottom-[-53px]"></div>
            </div>
            <div className="w-[239px] h-[193px] bg-[#C6DFF3] absolute bottom-[36px] left-[119px]">
              <img src={HeroOrnamen1} alt="Hero Ornament 1" className="absolute bottom-[-33px] right-[-167px]" />
            </div>
            <div className="w-[239px] h-[193px] bg-[#F0FF8F] absolute right-[45px] bottom-[3px]">
              <img src={HeroOrnamen2} alt="Hero Ornament 2" className="absolute left-[50%] top-[50%] transform -translate-1/2" />
            </div>
          </div>
        </div>

        {/* Subtitle & Metadata */}
        <div className="flex justify-between items-start max-lg:flex-col max-lg:items-start gap-[30px]">
          <div className="flex flex-col gap-4 max-w-[431px] w-full shrink-0">
            <span className="font-Lexend text-[18px] font-[500] leading-[180%]">
              {subtitle || defaultSubtitle}
            </span>

            <div className="flex flex-col gap-2 text-[#5E615E] text-[16px]">
              {/* Lokasi */}
              <div className="inline-flex gap-2 items-center">
                <img src={IcAddress} alt="Location Icon" className="w-[20px] h-[20px]" />
                <span>{location || '-'}</span>
              </div>
              {/* Waktu */}
              <div className="inline-flex gap-2 items-center">
                <img src={IcTime} alt="Time Icon" className="w-[20px] h-[20px]" />
                <span>{time ? `${time} - Selesai` : '-'}</span>
              </div>
              {/* Tanggal */}
              <div className="inline-flex gap-2 items-center">
                <CalendarDaysIcon className="w-5 h-5 text-(--blue)" />
                <span>{formatDate(date)}</span>
              </div>
              {/* Kontak */}
              <div className="inline-flex gap-2 items-center">
                <PhoneIcon className="w-5 h-5 text-(--blue)" />
                <span>{contact || '-'}</span>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div
            className="prose prose-lg max-w-[735px] font-Lexend font-[300] leading-[180%] text-[#5E615E] max-xl:text-[16px]"
            dangerouslySetInnerHTML={{
              __html: description || defaultDescription,
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default EventHeader;
