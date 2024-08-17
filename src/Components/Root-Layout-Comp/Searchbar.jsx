import { AutoComplete } from 'antd';
import { useState } from 'react';
import useFetchData from '../../Custom Hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '../../Context/SearchResultContext';

export const SearchBar = () => {
  const { setSearchResult } = useSearchResult();
  const navigate = useNavigate();
  const { products, categories, stores } = useFetchData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const matchingCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const matchingCategoryIds = matchingCategories.map((category) => category.id);
  const filteredProductsByCategory = products.filter((product) =>
    matchingCategoryIds.includes(product.categoryId),
  );

  const matchingStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const matchingStoreIds = matchingStores.map((store) => store.id);
  const filteredProductsByStore = products.filter((product) =>
    matchingStoreIds.includes(product.storeId),
  );

  const searchProducts = [
    ...filteredProductsByCategory,
    ...filteredProductsByStore,
    ...filteredProducts,
  ];
  const options = searchProducts.map((product) => ({
    label: product.title,
    value: product.id,
  }));
  const handleSelect = (value, title) => {
    setSearchTerm(title.label);
    navigate(`/products/${value}`);
  };

  const searchHandler = (e) => {
    if (e.code === 'Enter') {
      setSearchResult(searchProducts);
      navigate('/search-result');
    }
  };
  return (
    <AutoComplete
      options={options.slice(0, 5)}
      filterOption={false}
      onSelect={handleSelect}
      onKeyDown={searchHandler}
    >
      <div className="group relative hidden sm:block">
        <input
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full
          border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
        />
      </div>
    </AutoComplete>
  );
};
