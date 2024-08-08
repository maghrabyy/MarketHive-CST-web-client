import { FaShoppingCart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import Card from 'antd/es/card/Card';
import { Skeleton } from 'antd';
export const ProductCard = ({ prodTitle, prodPrice, prodImg, isLoading }) => {
  return isLoading ? (
    <Card className="h-[300px]">
      <Skeleton active />
      <Skeleton active className="mt-2.5" />
    </Card>
  ) : (
    <Card
      hoverable
      cover={
        <div className="relative">
          <FaShoppingCart className="absolute top-4 right-4 cursor-pointer text-primary hover:text-primary/75" />
          <FaRegHeart className="absolute top-4 right-10 cursor-pointer text-primary hover:text-primary/75" />
          <img
            alt={prodTitle}
            className="pt-2 h-[300px] w-full object-contain"
            src={prodImg}
          />
        </div>
      }
    >
      <h1 className="font-bold truncate">{prodTitle}</h1>
      <p className="text-gray-400">{prodPrice.toLocaleString()} EGP</p>
    </Card>
  );
};

export const CollectionCard = ({
  prodTitle,
  prodImg,
  contain,
  cover,
  isLoading,
}) => {
  return isLoading ? (
    <Card className="h-[200px]">
      <Skeleton active />
    </Card>
  ) : (
    <Card
      hoverable
      cover={
        <img
          alt={prodTitle}
          className={`h-[200px] ${contain && 'object-contain'} ${cover && 'object-cover'}`}
          src={prodImg}
        />
      }
    >
      <h1 className="font-bold text-2xl text-center truncate">{prodTitle}</h1>
    </Card>
  );
};
