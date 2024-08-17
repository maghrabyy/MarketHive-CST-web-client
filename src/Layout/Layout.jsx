import Navbar from '../Components/Root-Layout-Comp/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Root-Layout-Comp/Footer';
import { Spin } from 'antd';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { SearchDrawer } from '../Components/Root-Layout-Comp/SearchDrawer';
export default function Layout({ isRoutesLoading }) {
  const location = useLocation().pathname;
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
  return (
    <>
      <SearchDrawer />
      <Navbar />
      <div className="min-h-screen relative">
        {isRoutesLoading ? (
          <div className="h-full absolute left-1/2 flex flex-col justify-center">
            <Spin size="large" className="self-stretch " />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <Footer />
    </>
  );
}
