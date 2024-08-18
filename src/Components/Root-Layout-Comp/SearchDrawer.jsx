import { Drawer } from 'antd';
import { useSearchDrawer } from '../../Context/SearchDrawerContext';
import { Input } from 'antd';
import { useProductSearch } from '../../Custom Hooks/useSearchResult';
import { useState } from 'react';
import { Button } from 'antd';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSearchResult } from '../../Context/SearchResultContext';

export const SearchDrawer = () => {
  const navigate = useNavigate();
  const { setSearchResult } = useSearchResult();
  const [searchTerm, setSearchTerm] = useState('');
  const { showSearchDrawer, setShowSearchDrawer } = useSearchDrawer();
  const { searchProducts, searchSuggestions } = useProductSearch(searchTerm);
  const searchResultHandler = () => {
    if (searchProducts.length > 0) {
      setSearchResult(searchProducts);
      navigate(`/search-result/${searchTerm}`);
      setShowSearchDrawer(false);
      setSearchTerm('');
    }
  };
  const selectedProductHandler = (prodId) => {
    navigate(`/products/${prodId}`);
    setShowSearchDrawer(false);
    setSearchTerm('');
  };
  return (
    <Drawer
      title="Search Products"
      placement="right"
      open={showSearchDrawer}
      onClose={() => setShowSearchDrawer(false)}
    >
      <div className="search-drawer-content flex flex-col gap-2">
        <Input
          placeholder="Search for products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={searchResultHandler}
          icon={<FaSearch />}
          type="primary"
        >
          Search Products
        </Button>

        {searchTerm.length === 0 ? (
          <p className="text-xl font-semibold ms-2">Search for products.</p>
        ) : searchSuggestions.length > 0 ? (
          searchSuggestions.map((prod) => (
            <div
              key={prod.value}
              onClick={() => selectedProductHandler(prod.value)}
              className="select-none cursor-pointer py-1 px-2 text-white font-semibold bg-primary hover:bg-primary/80 rounded-md"
            >
              {prod.label}
            </div>
          ))
        ) : (
          <p className="text-xl font-semibold ms-2">No products found.</p>
        )}
      </div>
    </Drawer>
  );
};
