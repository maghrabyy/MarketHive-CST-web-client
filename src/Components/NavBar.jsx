import { Link } from 'react-router-dom';
import logo from '../assets/MHLogo.png';
import { IoMdSearch } from 'react-icons/io';
import { FaShoppingCart } from 'react-icons/fa';

export default function NavBar() {
  return (
    <div className="shadow-md bg-white  ">
      {/* Upper */}
      <div className=" bg-gray-50 py-2 paddingX flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
            <img src={logo} alt="logo" className="w-28 uppercase" />{' '}
          </Link>
        </div>
        {/* Search */}
        <div className="group relative hidden sm:block  ">
          <input
            type="search"
            placeholder="Search"
            className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full
            border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
          />
          <IoMdSearch className="text-gray-500 group-hover:text-primary  absolute top-[0.6rem] right-3" />
        </div>

        {/* Shopping Cart & Account*/}

        <div className=" flex gap-2 items-center font-medium ">
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div className="border-l ps-3 border-gray-400">
            <Link to="/register">Register</Link>
          </div>
          <Link
            className="text-primary py-2 px-4 group  rounded-full"
            to="/cart"
          >
            <FaShoppingCart className="text-xl drop-shadow-sm cursor-pointer" />
          </Link>
          <IoMdSearch className="text-gray-500 text-xl cursor-pointer group-hover:text-primary block sm:hidden " />
        </div>
      </div>
      {/* Lower */}
      <div className="flex  justify-center p-2">
        <ul className="flex items-center gap-5 font-semibold ">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/stores">Stores</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
