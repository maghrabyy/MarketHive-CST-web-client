import { AutoComplete } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '../../Context/SearchResultContext';
import { useProductSearch } from '../../Custom Hooks/useSearchResult';

export const SearchBar = () => {
  const { setSearchResult } = useSearchResult();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { searchProducts, searchSuggestions } = useProductSearch(searchTerm);
  const handleSelect = (value, title) => {
    setSearchTerm(title.label);
    navigate(`/products/${value}`);
  };

  const searchHandler = (e) => {
    if (searchProducts.length > 0) {
      if (e.code === 'Enter') {
        setSearchResult(searchProducts);
        navigate(`/search-result/${searchTerm}`);
      }
    }
  };
  return (
    <AutoComplete
      options={searchSuggestions}
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
