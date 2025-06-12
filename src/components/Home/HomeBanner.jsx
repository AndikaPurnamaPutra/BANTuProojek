import Button from '../Ui/Button';
import HomeBannerImage from '../../assets/images/HomeBanner-image.png';
import HomeBannerOrnament from '../../assets/images/homeBanner-ornamen.svg';

const HomeBanner = () => {
  return (
    <>
      <section className='home-banner pb-[120px] max-lg:pb-[60px]'>
        <div className="container">
          <div className="content flex justify-between items-center gap-[50px] max-lg:flex-col">
            <div className="content-sub max-lg:hidden">
              <img src={HomeBannerImage} className="w-full"></img>
            </div>
            <div className="content-sub max-w-[685px] flex flex-col gap-8">
              <img src={HomeBannerOrnament} className='max-w-[238px]'></img>
              <div className='flex flex-col items-start gap-5'>
                <h2 className="title-h2">Bring Your Own Projects <span className='bg-highlight'>(b.y.o.p)</span></h2>
                <p className="desc max-w-[431px]">
                  Designer akan membagikan portofolio dan mempresentasikan
                  kepada artisan
                </p>
                <Button to="/event" variant="primary">
                  Gabung Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBanner;
