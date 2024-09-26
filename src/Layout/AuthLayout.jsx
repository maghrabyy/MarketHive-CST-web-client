import Navbar from '../Components/Root-Layout-Comp/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Root-Layout-Comp/Footer';
import { SearchDrawer } from '../Components/Root-Layout-Comp/SearchDrawer';

export default function AuthLayout() {
  return (
    <>
      <SearchDrawer />
      <Navbar />
      <div className="min-h-screen relative">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
