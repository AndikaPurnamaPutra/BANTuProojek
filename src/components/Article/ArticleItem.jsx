import { Link } from 'react-router-dom';

const ArticleItem = ({ id, image, date, title }) => {
  return (
    <Link to={`/article-detail/${id}`} className="block">
      <div className="flex flex-col gap-5">
        <img
          src={image}
          alt={title} // alt dari judul artikel
          className="rounded-lg w-full object-cover h-[265px] bg-gray-200"
        />
        <div className="flex flex-col gap-1">
          <span className="font-Lexend font-[300] text-gray-500">{date}</span>
          <h2 className="text-[24px] font-bold leading-[150%] text-black max-xl:text-[20px]">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ArticleItem;
