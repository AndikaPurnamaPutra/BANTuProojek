import PropTypes from 'prop-types';

const CardHero = ({ title, description }) => {
  return (
    <div className="bg-white px-6 pt-6 pb-[57px] rounded-[20px] flex flex-col gap-3 text-center max-w-[394px] w-full max-lg:max-w-full max-lg:p-10 max-md:p-6">
      <h1
        className="text-(--blue) text-[32px] font-medium leading-[150%] max-md:text-[24px]"
        style={{ fontFamily: 'Parkinsans' }}
      >
        {title}
      </h1>
      <p className="text-(--gray) text-lg leading-[180%] max-md:text-[16px]">{description}</p>
    </div>
  );
};

CardHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardHero;
