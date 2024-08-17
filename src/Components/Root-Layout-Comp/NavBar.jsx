import { Link } from 'react-router-dom';
import logo from '../../assets/MHLogo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { auth } from '../../firebase';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Avatar from 'antd/es/avatar/avatar';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './Searchbar';
import { IoMdSearch } from 'react-icons/io';
import { useSearchDrawer } from '../../Context/SearchDrawerContext';

export default function NavBar() {
  const { setShowSearchDrawer } = useSearchDrawer();
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState();
  const logoutHandler = async () => {
    await signOut(auth);
    navigate('/login');
  };
  useEffect(() => {
    auth.onAuthStateChanged(setAuthUser);
  }, [authUser]);
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

        <SearchBar />
        {/* Actions & Account*/}

        <div className=" flex gap-2 items-center font-medium ">
          <IoMdSearch
            onClick={() => setShowSearchDrawer(true)}
            className="text-primary  hover:text-primary/80 text-xl cursor-pointer group-hover:text-primary block sm:hidden "
          />
          <Link
            className="text-primary hover:text-primary/80 group  rounded-full"
            to="/cart"
          >
            <FaShoppingCart className="text-xl drop-shadow-sm cursor-pointer" />
          </Link>
          <div className="action sm:order-first">
            {authUser !== null ? (
              <div
                onClick={logoutHandler}
                className="flex gap-1 items-center text-red-600 cursor-pointer select-none"
              >
                <FiLogOut />
                <span className="font-medium hidden sm:block">Logout</span>
              </div>
            ) : (
              <>
                <Avatar
                  size="small"
                  className="cursor-pointer bg-primary hover:bg-primary/80 sm:hidden"
                  icon={<FaUser />}
                />

                <div className="space-x-2 divide-x-2 hidden sm:block">
                  <Link to="/login">Login</Link>
                  <Link to="/register" className="ps-2">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Lower */}
      <div className="flex  justify-center p-2">
        <ul className="flex items-center gap-5 font-semibold ">
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/stores">Stores</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
