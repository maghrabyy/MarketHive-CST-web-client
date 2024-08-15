import { fetchProducts } from '../../lib/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';

export const ProductsStorePage = ({ storeId }) => {
  const [storesProducts, setStoresProducts] = useState([]);
  useEffect(() => {
    const fetchStoreProducts = async () => {
      const fetchedProducts = await fetchProducts('storeId', storeId);
      setStoresProducts(fetchedProducts);
    };
    fetchStoreProducts();
  }, [storeId]);
  return <ProductsPage productsList={storesProducts} />;
};
