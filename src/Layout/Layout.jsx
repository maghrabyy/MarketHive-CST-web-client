import Navbar from '../Components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="paddingX">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
