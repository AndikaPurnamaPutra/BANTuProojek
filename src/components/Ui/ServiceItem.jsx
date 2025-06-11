import { Link } from 'react-router-dom';
import IconRIght from '../../assets/icons/ic-arrow_right.svg';

const ServiceItem = ({ number = 1, title = "User Interface Design", to = "#" }) => {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between pb-3 border-b border-[#D4DADF]">
        <div className="after-circle flex items-center justify-center flex-row-reverse">
          <h3 className="font-Parkinsans text-[56px] leading-[150%] text-[var(--blue)] ml-[-18px]">
            {number}
          </h3>
        </div>
        <div className="max-w-[60%] flex items-center justify-between w-full">
          <span className="font-Parkinsans text-[44px] leading-[150%] text-[var(--blue)]">
            {title}
          </span>
          <div className="p-3.5 bg-[#DCF343] rounded-full inline-flex">
            <img src={IconRIght} width="30" height="30" alt="arrow" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceItem;
