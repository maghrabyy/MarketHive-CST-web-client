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
import { ProductsStorePage } from './Pages/Products Page/ProductsStorePage.jsx';
import { ProductsCategoryPage } from './Pages/Products Page/ProductsCategoryPage.jsx';
import ProductDetailPage from './Pages/ProductDetail Page/ProductDetailPage.jsx';
import { SearchResultPage } from './Pages/Products Page/SearchResultPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import UnAuthRoute from './Components/ProtectedRoute/UnAuthRoute.jsx';

function App() {
  const routers = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'cart',
          element: (
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          ),
        },
        { path: 'search-result/:keyword', element: <SearchResultPage /> },
        {
          path: 'categories',
          element: <CategoriesPage />,
          children: [
            {
              path: '/categories/:categoryId',
              element: <ProductsCategoryPage />,
            },
          ],
        },
        {
          path: 'stores',
          element: <StoresPage />,
          children: [
            { path: '/stores/:storeId', element: <ProductsStorePage /> },
          ],
        },
        {
          path: 'products',
          element: <ProductsPage />,
          children: [
            { path: '/products/:prodId', element: <ProductDetailPage /> },
          ],
        },
        {
          path: 'login',
          element: (
            <UnAuthRoute>
              <LoginPage />
            </UnAuthRoute>
          ),
        },
        {
          path: 'register',
          element: (
            <UnAuthRoute>
              <RegisterPage />
            </UnAuthRoute>
          ),
        },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
