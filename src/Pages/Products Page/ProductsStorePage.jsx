import { fetchProducts } from '../../lib/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';

export const ProductsStorePage = ({ store }) => {
  const [storesProducts, setStoresProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchStoreProducts = async () => {
      const fetchedProducts = await fetchProducts('storeId', store.id);
      setIsLoading(false);
      setStoresProducts(fetchedProducts);
    };
    fetchStoreProducts();
  }, [store]);
  return (
    <ProductsPage
      productsList={storesProducts}
      isLoading={isLoading}
      collectionName={store.name}
    />
  );
};
