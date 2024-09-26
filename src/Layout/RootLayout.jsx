import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
export const RootLayout = () => {
  const location = useLocation().pathname;
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
};
