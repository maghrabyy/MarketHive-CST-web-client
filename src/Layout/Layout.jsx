import Navbar from '../Components/Root-Layout-Comp/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Root-Layout-Comp/Footer';
import { Spin } from 'antd';

export default function Layout({ isRoutesLoading }) {
  return (
    <>
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
