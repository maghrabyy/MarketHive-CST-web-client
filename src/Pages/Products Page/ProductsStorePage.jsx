import { fetchProducts } from '../../util/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';
import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../../Components/BreadCrumb';
import { FaHome } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa';
import { useFetchStore } from '../../Custom Hooks/useFetchStore';
import { Avatar, Divider, Spin } from 'antd';

export const ProductsStorePage = () => {
  const { storeId } = useParams();
  const { store, isStoreLoading } = useFetchStore(storeId);
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
      <div className="flex flex-col items-center justify-center space-y-3 rounded-md shadow-md p-2">
        {isLoading && <Spin />}
        <Avatar
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
          onLoad={handleImageLoad}
          src={store.logo}
          style={isLoading ? { display: 'none' } : { objectFit: 'contain' }}
        />
        <h2 className="text-xl text-slate-800 font-semibold">{store.name}</h2>
        <h4 className="text-lg text-slate-800 font-semibold">
          {store.storeDescription}
        </h4>
      </div>
      <ProductsPage productsList={storesProducts} isLoading={isLoading} />
    </div>
  );
};
