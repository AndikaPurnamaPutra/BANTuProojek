import { Link } from 'react-router-dom';
import IconRIght from '../../assets/icons/ic-arrow_right.svg';

const ServiceItem = ({
  number = 1,
  title = 'User Interface Design',
  to = '#',
}) => {
  return (
    <Link to={to} data-discover="true" className="group">
      <div className="flex relative items-center justify-between pb-3 border-b border-[#D4DADF]">
        <div className="after-circle flex items-center justify-center flex-row-reverse max-lg:hidden">
          <h3 className="font-Parkinsans text-[56px] leading-[150%] text-[var(--blue)] ml-[-18px]">
            {number}
          </h3>
        </div>
        <div className="max-w-[60%] flex items-center justify-between w-full max-lg:max-w-full">
          <span className="font-Parkinsans text-[44px] leading-[150%] text-[var(--blue)] max-lg:text-[32px] max-md:text-[24px]">
            {title}
          </span>
          <div className="p-3.5 bg-[#DCF343] rounded-full inline-flex max-md:p-2 xl:mr-4">
            <img
              src={IconRIght}
              width="30"
              height="30"
              alt="arrow"
              className="max-md:w-[24px]"
            />
          </div>
        </div>
        <div className="absolute bottom-0 h-0 bg-[#DCF343] z-[-1] w-full group-hover:h-full transition-all duration-300 max-lg:hidden"></div>
      </div>
    </Link>
  );
};

export default ServiceItem;
