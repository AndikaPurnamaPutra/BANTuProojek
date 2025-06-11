import HeroOrnamen1 from "../../assets/images/hero-ornamen-1.svg";
import HeroOrnamen2 from "../../assets/images/hero-ornamen-2.svg";

// EventHeader.jsx
const EventHeader = () => {
  return (
    <section className="event-header">
      <div className="container flex flex-col gap-[100px]">
        <div className="relative min-h-[612.69px] flex items-center justify-center">
          <h1 className="text-[108px] leading-[130%] text-center text-(--blue) relative z-[1]">
            Bring Your Own Projects (b.y.o.p)
          </h1>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
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
        <div className="flex justify-between items-start">
          <span className="font-Lexend text-[18px] font-[500] leading-[180%] max-w-[431px] w-full shrink-0">
            Designer akan membagikan portofolio dan mempresentasikan kepada
            artisan
          </span>
          <div>
            <p className="font-Lexend text-[24px] leading-[180%] font-[300] max-w-[735px]">
              Program Bring Your Own Projects adalah konsep di mana desainer
              membawa portofolio atau karya mereka untuk dipresentasikan dan
              dibagikan kepada artisan atau komunitas kreatif. Tujuan dari
              program ini adalah untuk mendorong kolaborasi kreatif, di mana
              desainer dan artisan dapat berdiskusi tentang ide, gaya, atau
              teknik untuk menghasilkan karya yang lebih inovatif. Kegiatan ini
              membuka peluang jaringan dan kerja sama jangka panjang antara
              desainer dan artisan. Biasanya, kegiatan meliputi presentasi
              portofolio, diskusi kelompok, atau sesi prototyping bersama.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHeader;
