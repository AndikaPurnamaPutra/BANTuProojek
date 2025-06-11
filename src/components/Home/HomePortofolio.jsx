import ServiceItem from '../Ui/ServiceItem';

const HomePortofolio = () => {
  return (
    <>
      <section className="home-portofolio pt-[178px] pb-[144px] max-lg:py-[64px]">
        <div className="container">
          <div className="content flex flex-col gap-10">
            <div className="content-sub flex justify-between items-center max-lg:flex-col max-lg:items-start max-lg:gap-6">
              <h2 className="title-h2 max-w-[585px]">
                Temukan Karya Terbaik{' '}
                <span className="bg-highlight">Disini</span>
              </h2>
              <p className="desc max-w-[466px]">
                Akses ke desainer yang kreatif, siap membantu mewujudkan ide-ide
                inovatif
              </p>
            </div>
            <div className="content-sub flex flex-col gap-5">
              <ServiceItem
                number={1}
                className="cursor-pointer"
                title="User Interface Design"
                to="/portfolio"
              />
              <ServiceItem
                number={2}
                className="cursor-pointer"
                title="Branding"
                to="/portfolio"
              />
              <ServiceItem
                number={3}
                className="cursor-pointer"
                title="Fotografi"
                to="/portfolio"
              />
              <ServiceItem
                number={4}
                className="cursor-pointer"
                title="Ilustrasi"
                to="/portfolio"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePortofolio;
