import { fetchProducts } from '../../util/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';
import { useParams } from 'react-router-dom';
import { BreadCrumb } from '../../Components/BreadCrumb';
import { FaHome } from 'react-icons/fa';
import { FaStore } from 'react-icons/fa';
import { useFetchStore } from '../../Custom Hooks/useFetchStore';

export const ProductsStorePage = () => {
  const { storeId } = useParams();
  const { store, isStoreLoading } = useFetchStore(storeId);
  const [storesProducts, setStoresProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
      <ProductsPage productsList={storesProducts} isLoading={isLoading} />
    </div>
  );
};
