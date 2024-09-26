import { fetchProducts } from '../../util/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';
import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../../Components/BreadCrumb';
import { FaHome } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa';
import { useFetchStore } from '../../Custom Hooks/useFetchStore';
import { Avatar, Spin } from 'antd';
import { useOutlet } from 'react-router-dom';
import { Divider } from 'antd';
import { useFetchCategory } from '../../Custom Hooks/useFetchCategory';
import { BsFillGridFill } from 'react-icons/bs';

export const ProductsStorePage = () => {
  const outlet = useOutlet();
  const { storeId } = useParams();
  const { store, isStoreLoading } = useFetchStore(storeId);
  const { category, isCategoryLoading } = useFetchCategory(store.categoryId);
  const [storesProducts, setStoresProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  useEffect(() => {
    const fetchStoreProducts = async () => {
      const fetchedProducts = await fetchProducts('storeId', storeId);
      setIsLoading(false);
      setStoresProducts(fetchedProducts);
    };
    fetchStoreProducts();
  }, [storeId]);
  return (
    outlet || (
      <div className="paddingX py-5 space-y-3">
        <BreadCrumb
          items={[
            {
              href: '/',
              icon: <FaHome />,
              title: 'Home',
            },

            {
              href: '/stores',
              icon: <FaStore />,
              title: 'Stores',
            },
            {
              title: isStoreLoading
                ? 'Loading..'
                : (store.name ?? 'Invalid store'),
            },
          ]}
        />
        <div className="flex flex-col items-center justify-center gap-2 rounded-md shadow-md p-4 bg-gray-50">
          {isLoading && <Spin />}
          <Avatar
            size={100}
            onLoad={handleImageLoad}
            src={store.logo}
            style={isLoading ? { display: 'none' } : { objectFit: 'contain' }}
          />
          <h2 className="text-xl text-slate-800 font-semibold text-center">
            {store.name}
          </h2>
          <Divider className="my-2" />
          <div className="category-badge border border-gray-300 px-2 py-1 rounded-md">
            {isCategoryLoading ? (
              'Loading...'
            ) : (
              <div className="category flex gap-1 items-center">
                <BsFillGridFill /> {category.categoryName}
              </div>
            )}
          </div>
          <h4 className="text-lg text-slate-800 font-semibold text-center">
            {store.storeDescription}
          </h4>
        </div>
        <div className="shadow-md rounded-md px-6 py-8 bg-gray-50">
          <ProductsPage productsList={storesProducts} isLoading={isLoading} />
        </div>
      </div>
    )
  );
};
