import noProductsImg from '../assets/no-products.svg';
import noStoresImg from '../assets/no-stores.svg';
import emptyDefaultImg from '../assets/empty-default.svg';
import { useNavigate } from 'react-router-dom';

export const EmptyList = ({ type }) => {
  const navigate = useNavigate();
  let imgSrc, emptyMsg;
  if (type === 'stores') {
    imgSrc = noStoresImg;
    emptyMsg = 'There are no stores here.';
  } else if (type === 'products') {
    imgSrc = noProductsImg;
    emptyMsg = 'There are no products here.';
  } else {
    imgSrc = emptyDefaultImg;
    emptyMsg = 'Nothing is in here.';
  }

  return (
    <div className="Empty-list grid grid-cols-1 md:grid-cols-2 gap-2 items-center px-4">
      <div className="empty-msg order-last md:order-first text-center md:text-start">
        <h1 className="text-3xl font-bold">{emptyMsg}</h1>
        <p>
          You can go{' '}
          <span
            onClick={() => navigate(-1)}
            className="text-blue-500 hover:text-blue-400 cursor-pointer"
            to={'..'}
          >
            back.
          </span>
        </p>
      </div>
      <img src={imgSrc} className="w-[450px]" alt="Empty list" />
    </div>
  );
};