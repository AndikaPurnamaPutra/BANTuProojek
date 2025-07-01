import CardHero from '../Ui/CardHiro';
import heroImage1 from '../../assets/images/hero-image-1.png';
import heroImage2 from '../../assets/images/hero-image-2.png';
import heroImage3 from '../../assets/images/hero-image-3.svg';
import heroOrnamen1 from '../../assets/images/hero-ornamen-1.svg';
import heroOrnamen2 from '../../assets/images/hero-ornamen-2.svg';
import heroOrnamen3 from '../../assets/images/hero-image-5.svg';
import heroOrnamen4 from '../../assets/images/hero-image-6.svg';

const HeroSection = () => {
  return (
    <>
      <section className="hero-section pt-16">
        <div className="container">
          <div className="content flex flex-col gap-12 max-md:gap-6">
            <div className="content-sub flex flex-col gap-0.5 items-end max-xl:items-start">
              <h1 className="title-h1">Bantu Perkenalkan</h1>
              {/* PERBAIKAN: Sintaks variabel CSS */}
              <h1 className="title-h1 text-[var(--blue-light)]! mr-64 max-xl:mr-[unset]">
                Karya Terbaikmu
              </h1>
            </div>
            <div className="content-sub flex items-end justify-center relative max-xl:hidden">
              <img
                src={heroImage1}
                alt="heroImage1"
                className="w-[248px] mr-[166px]"
              ></img>
              <img
                src={heroImage3}
                alt="heroImage3"
                className="mr-[24px]"
              ></img>
              <img
                src={heroImage2}
                alt="heroImage2"
                className="w-[248px] mb-[116px]"
              ></img>
              <div className="ornament">
                <div className="ornamen-box-1 absolute top-[-26px] left-[-60px] z-[-1]"></div>
                <div className="ornamen-box-2 absolute top-[67px] left-[329px] z-[-1]">
                  <img
                    src={heroOrnamen1}
                    className="bottom-[87.5%] right-[-50%] absolute"
                  ></img>
                </div>
                <div className="ornamen-box-3 absolute top-[116px] right-[29px] z-[-1]"></div>
                <div className="ornamen-box-4 absolute right-[-100px] top-[-132px]">
                  <img src={heroOrnamen2}></img>
                </div>
              </div>
            </div>
            <div className="content-sub flex justify-between gap-7 relative mt-[138px] max-lg:mt-[unset] max-lg:flex-col max-md:gap-4">
              <CardHero
                title="Sarana Kenalkan Karya"
                description="Memperkenalkan karya-karya desain kepada pasar yang lebih luas, baik secara lokal maupun internasional."
              />
              <CardHero
                title="Temukan Desainer Sesuai Passion"
                description="Membuka peluang kepada artisan untuk menemukan designer yang sesuai dengan kriteria"
              />
              <CardHero
                title="Pengghubung Antara Desainer dan Artisan"
                description="Menghubungkan desainer dengan artisan dalam satu tempat"
              />
              <img
                src={heroOrnamen3}
                className="absolute left-[291px] top-[-58px] z-[-1] max-md:hidden"
              ></img>
              <img
                src={heroOrnamen4}
                className="absolute right-[301px] bottom-[-58px] z-[-1] max-md:hidden"
              ></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
