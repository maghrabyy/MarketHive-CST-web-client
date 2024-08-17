import useFetchData from './useFetchData';

export const useProductSearch = (searchTerm) => {
  const { products, categories, stores } = useFetchData();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm?.toLowerCase()),
  );

  const matchingCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm?.toLowerCase()),
  );
  const matchingCategoryIds = matchingCategories.map((category) => category.id);
  const filteredProductsByCategory = products.filter((product) =>
    matchingCategoryIds.includes(product.categoryId),
  );

  const matchingStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm?.toLowerCase()),
  );
  const matchingStoreIds = matchingStores.map((store) => store.id);
  const filteredProductsByStore = products.filter((product) =>
    matchingStoreIds.includes(product.storeId),
  );

  const searchProducts = [
    ...filteredProductsByCategory,
    ...filteredProductsByStore,
    ...filteredProducts,
  ].filter(
    (prod, index, array) =>
      array.map((product) => product.id).indexOf(prod.id) === index,
  );
  const searchSuggestions = searchProducts
    .map((product) => ({
      label: product.title,
      value: product.id,
    }))
    .slice(0, 5);

  return { searchProducts, searchSuggestions };
};
