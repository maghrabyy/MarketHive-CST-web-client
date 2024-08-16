import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout.jsx';
import HomePage from './Pages/Home Page/HomePage.jsx';
import NotFoundPage from './Pages/NotFound Page/NotFoundPage.jsx';
import CartPage from './Pages/Cart Page/CartPage.jsx';
import ProductsPage from './Pages/Products Page/ProductsPage.jsx';
import LoginPage from './Pages/Login Page/LoginPage.jsx';
import RegisterPage from './Pages/Register Page/RegisterPage.jsx';
import StoresPage from './Pages/Stores Page/StoresPage.jsx';
import CategoriesPage from './Pages/Categories Page/CategoriesPage.jsx';
import ProductDetailPage from './Pages/ProductDetail Page/ProductDetailPage.jsx';

let routers = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'stores', element: <StoresPage /> },
      {
        path: 'products',
        element: <ProductsPage />,
        children: [{ path: ':prodId', element: <ProductDetailPage /> }],
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
