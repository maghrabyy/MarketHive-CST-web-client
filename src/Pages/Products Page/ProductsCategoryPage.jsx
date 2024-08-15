import { fetchProducts } from '../../lib/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';

export const ProductsCategoryPage = ({ categoryId }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const fetchedProducts = await fetchProducts('categoryId', categoryId);
      setCategoryProducts(fetchedProducts);
    };
    fetchCategoryProducts();
  }, [categoryId]);

  return <ProductsPage productsList={categoryProducts} />;
};
