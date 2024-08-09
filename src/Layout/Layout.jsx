import Navbar from '../Components/Root-Layout-Comp/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/Root-Layout-Comp/Footer';
import { auth } from '../firebase';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  auth.onAuthStateChanged((auth) => {
    if (auth && (location === '/login' || location === '/register')) {
      navigate('/');
    }
  });
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
