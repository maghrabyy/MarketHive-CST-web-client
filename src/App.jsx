import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import HomePage from './Pages/Homepage/HomePage.jsx';
import NotFoundPage from './Pages/NotFound/NotFoundPage.jsx';
import CartPage from './Pages/Cart/CartPage.jsx';
import ProductsPage from './Pages/Products/ProductsPage.jsx';
import LoginPage from './Pages/LogIn/LoginPage.jsx';
import RegisterPage from './Pages/Register/RegisterPage.jsx';
import StoresPage from './Pages/Stores/StoresPage.jsx';

let routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'stores', element: <StoresPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
