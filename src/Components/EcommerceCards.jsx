import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import Card from 'antd/es/card/Card';
import { Skeleton, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useFetchStore } from '../Custom Hooks/useFetchStore';
import { useFetchWishList } from '../Custom Hooks/useFetchWishList';

export const ProductCard = ({ product, showStore = true }) => {
  const {isAddedToWishlist,wishlistHandler,isLoading} =useFetchWishList(product.id)

  const { store, isStoreLoading } = useFetchStore(product.storeId);
  const productPrice = product.discount
    ? product.price - product.price * product.discount
    : product.price;
  return (
    
      <Card
        hoverable
        className="overflow-hidden"
        cover={
          <div className="relative">
            <FaShoppingCart className="absolute top-4 right-4 cursor-pointer text-primary hover:text-primary/75" />
            {isLoading?<Spin size='small'/>:isAddedToWishlist()?<>
             <FaHeart onClick={wishlistHandler}  className="absolute top-4 right-10 cursor-pointer text-primary hover:text-primary/75"  />
            </>:<>
            <FaRegHeart onClick={
              wishlistHandler}  className="absolute top-4 right-10 cursor-pointer text-primary hover:text-primary/75"  />
            
            </>}
            {product.discount > 0 && (
              <h2 className="discount absolute top-0 left-0 rounded-br-lg bg-red-500 text-white select-none p-2">
                - {product.discount * 100}%
              </h2>
            )}
            {showStore && (
              <Link to={`/products/${product.id}`} className=''>

              <div className="store-info absolute bottom-0 left-0 py-1 px-2 w-full flex justify-center gap-2 items-end bg-gray-100 bg-opacity-80 backdrop-blur-sm">
                {isStoreLoading ? (
                  <p className="text-lg">Loading...</p>
                ) : (

                  <>

                  

                    <img
                      className="size-9 rounded-full object-contain"
                      src={store.logo}
                      alt={store.name}
                    />
                    <h2 className="text-xl text-slate-800 font-semibold">
                      {store.name}
                    </h2>

                  </>
                )}
              </div>
              </Link>

            )}
            <Link to={`/products/${product.id}`}>
            <img
              alt={product.title}
              className="pt-2 h-[300px] w-full object-contain"
              src={product.images[0]}
            />
            </Link>
          </div>
        }
      >
                    <Link to={`/products/${product.id}`}>
        <h1 className="font-bold truncate">{product.title}</h1>
        {product.discount ? (
          <div className="product-price flex items-center gap-2">
            <p className="text-gray-400 text-lg">
              {productPrice.toLocaleString()} EGP
            </p>
            <p className="text-gray-400 text-sm line-through">
              {product.price.toLocaleString()} EGP
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-lg">
            {productPrice.toLocaleString()} EGP
          </p>
        )}
        </Link>

      </Card>
  
  );
};

export const SkeletonProdsCard = () => {
  return (
    <Card className="h-[300px]">
      <Skeleton active />
      <Skeleton active className="mt-2.5" />
    </Card>
  );
};

export const CollectionCard = ({
  prodTitle,
  prodImg,
  contain,
  cover,
  path,
}) => {
  return (
    <Link to={path}>
      <Card
        className="overflow-hidden"
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
    </Link>
  );
};

export const SkeletonCollectionCard = () => {
  return (
    <Card className="h-[200px]">
      <Skeleton active />
    </Card>
  );
};
