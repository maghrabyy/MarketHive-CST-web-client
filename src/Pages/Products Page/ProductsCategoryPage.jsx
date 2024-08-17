import { fetchProducts } from '../../lib/fetchProducts';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';

export const ProductsCategoryPage = ({ category }) => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const fetchedProducts = await fetchProducts('categoryId', category.id);
      setCategoryProducts(fetchedProducts);
      setIsLoading(false);
    };
    fetchCategoryProducts();
  }, [category]);

  return (
    <ProductsPage
      productsList={categoryProducts}
      collectionName={category.categoryName}
      isLoading={isLoading}
    />
  );
};
