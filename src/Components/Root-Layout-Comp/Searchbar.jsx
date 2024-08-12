import { IoMdSearch } from 'react-icons/io';

export const SearchBar = () => {
  return (
    <div className="group relative hidden sm:block  ">
      <input
        type="search"
        placeholder="Search"
        className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full
      border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
      />
      <IoMdSearch className="text-gray-500 group-hover:text-primary  absolute top-[0.6rem] right-3" />
    </div>
  );
};
