import Button from '../Ui/Button';
import ForumImage from '../../assets/images/homeForum-image.svg';
import ForumOrnament from '../../assets/images/homeForum-ornamen.svg';

const HomeForum = () => {
  return (
    <>
      <section className='home-forum pb-[120px]'>
        <div className="container">
          <div className="content flex gap-[33px] items-end">
            <div className="content-sub flex flex-col items-start gap-5 max-w-[617px]">
              <h2 className='title-h2'>Tempat <span className='bg-highlight'>Ngobrol</span> dan Berbagi Pengalaman Ada disini!</h2>
              <p className='desc'>
                Saling terhubung dan berbagi ide serta pengalaman dengan sesama
                pekerja kreatif di forum diskusi
              </p>
              <Button to="/forum" variant="primary">
                Gabung Forum
              </Button>
            </div>
            <div className="content-sub relative">
              <img src={ForumImage} className='w-full rounded-[50px]'></img>
              <img src={ForumOrnament} className='absolute top-[-25px] right-[-72px]'></img>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeForum;
