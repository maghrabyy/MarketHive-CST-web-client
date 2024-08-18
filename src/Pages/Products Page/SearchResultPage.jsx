import ProductsPage from './ProductsPage';
import { useSearchResult } from '../../Context/SearchResultContext';

export const SearchResultPage = () => {
  const { searchResult } = useSearchResult();
  return (
    <>
      <h2 className="paddingX pt-8 text-xl">
        Search Results, {searchResult.length} item(s) found.
      </h2>
      <ProductsPage productsList={searchResult} />
    </>
  );
};
