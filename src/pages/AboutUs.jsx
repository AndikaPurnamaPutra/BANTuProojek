import ImageCard1 from '../assets/images/tim-card1.png';
import ImageCard2 from '../assets/images/tim-card2.png';
import ImageCard3 from '../assets/images/tim-card3.png';
import HeroOrnamen2 from '../assets/images/hero-ornamen-2.svg';

const Aboutus = () => {
  return (
    <>
      <section className="pt-[65px] mb-[150px]">
        <div className="container relative">
          <div className="flex flex-col gap-[50px] relative z-[1]">
            <h1 className="font-Parkinsans text-[108px] font-[400] text-(--blue) leading-[130%] max-w-[630px]">
              Cerita Kita Dimulai Dari Sini
            </h1>
            <div className="flex justify-end">
              <p className="text-[24px] leading-[180%] font-[300] text-[#5E615E] max-w-[735px]">
                Berawal dari hal-hal di sekitar kita—seperti teman-teman yang
                memiliki potensi dan keahlian di bidangnya. Tapi sering kali
                mereka belum menemukan klien yang cocok atau belum tahu harus
                memasarkan karyanya di mana. Baik itu untuk proyek komersial,
                maupun proyek sosial seperti menjadi relawan atau menambah
                pengalaman.
              </p>
            </div>
            <div className="flex">
              <p className="text-[24px] leading-[180%] font-[300] text-[#5E615E] max-w-[732px]">
                Bantu Proojek hadir sebagai penghubung antara para desainer atau
                kreator dengan klien—bisa dari artisan, UMKM, hingga perusahaan
                besar. <br />
                <br /> Kami mengkurasi teman-teman berdasarkan kapabilitas dan
                keilmuan/konsentrasi yang sejalan dengan kebutuhan klien. Inilah
                yang kami sebut sebagai passion project.
              </p>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
            <div className="w-[197px] h-[216px] bg-[#6F96D1] absolute top-[130px] right-[199px]">
              <div className="w-[174px] h-[174px] bg-[#DCF343] absolute top-[-99px] right-[-99px]"></div>
              <img
                src={HeroOrnamen2}
                alt="Hero Ornament 2"
                className="w-[113px] h-[113px] object-cover absolute top-[-57px] left-[-57px]"
              />
            </div>
            <div className="w-[447px] h-[447px] bg-[#DCF343] rounded-full absolute left-[-239px] top-[60%] transform translate-y-[-50%]"></div>
          </div>
        </div>
      </section>
      <section className="pb-[120px]">
        <div className="container flex flex-col gap-5">
          <h1 className="font-Parkinsans text-[56px] font-[400] text-(--blue) leading-[150%]">
            Tim Bantu Proojek
          </h1>
          <div className="flex flex-col justify-between items-center gap-5 flex-wrap">
            <div className="flex justify-between w-full">
              <div className="flex flex-col gap-8 max-w-[400px] w-full">
                <img
                  src={ImageCard1}
                  alt="Event Documentation 1"
                  className="w-full object-cover h-full "
                />
                <div className="flex flex-col gap-0.5 items-center">
                  <h3 className=" font-Parkinsans font-[500] text-(--blue) text-[32px] leading-[150%]">
                    Ifa Bilqiis
                  </h3>
                  <span className="text-[18px] leading-[180%] font-[300] text-[#7F909F]">
                    Project Manager
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-8 max-w-[400px] w-full">
                <div>
                  <img
                    src={ImageCard2}
                    alt="Event Documentation 2"
                    className="w-full object-cover h-full"
                  />
                </div>
                <div className="flex flex-col gap-0.5 items-center">
                  <h3 className=" font-Parkinsans font-[500] text-(--blue) text-[32px] leading-[150%]">
                    Fauziah Kesya
                  </h3>
                  <span className="text-[18px] leading-[180%] font-[300] text-[#7F909F]">
                    Project Manager
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 max-w-[400px] w-full">
              <div>
                <img
                  src={ImageCard3}
                  alt="Event Documentation 3"
                  className="w-full object-cover h-full "
                />
              </div>
              <div className="flex flex-col gap-0.5 items-center">
                <h3 className=" font-Parkinsans font-[500] text-(--blue) text-[32px] leading-[150%]">
                  Ariqah
                </h3>
                <span className="text-[18px] leading-[180%] font-[300] text-[#7F909F]">
                  Designer & Researcher
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Aboutus;
