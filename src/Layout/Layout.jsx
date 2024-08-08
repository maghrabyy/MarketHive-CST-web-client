import Navbar from '../Components/Root-Layout-Comp/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Root-Layout-Comp/Footer';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
