import PropTypes from 'prop-types';

const CardHero = ({ title, description }) => {
  return (
    <div className="bg-white px-6 pt-6 pb-[57px] rounded-[20px] flex flex-col gap-3 text-center max-w-[394px] w-full max-lg:max-w-full">
      <h1
        className="text-(--blue) text-[32px] font-bold leading-[150%]"
        style={{ fontFamily: 'Parkinsans' }}
      >
        {title}
      </h1>
      <p className="text-(--gray) text-lg leading-[180%]">{description}</p>
    </div>
  );
};

CardHero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardHero;
