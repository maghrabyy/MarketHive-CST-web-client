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
import { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { getDocs, collection } from 'firebase/firestore';

function App() {
  const [storesList, setStoresList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isRoutesLoading, setIsRoutesLoading] = useState(true);
  useEffect(() => {
    const fetchStores = async () => {
      const fetchedStores = [];
      const res = await getDocs(collection(db, 'Stores'));
      res.docs.forEach((store) => {
        fetchedStores.push({ ...store.data(), id: store.id });
      });
      setStoresList(fetchedStores);
      setIsRoutesLoading(false);
    };
    const fetchCategories = async () => {
      const fetchedCategories = [];
      const res = await getDocs(collection(db, 'Categories'));
      res.docs.forEach((category) => {
        fetchedCategories.push({ ...category.data(), id: category.id });
      });
      setCategoriesList(fetchedCategories);
      setIsRoutesLoading(false);
    };
    fetchStores();
    fetchCategories();
  }, []);

  const routers = createBrowserRouter([
    {
      path: '',
      element: <Layout isRoutesLoading={isRoutesLoading} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'search-result/:keyword', element: <SearchResultPage /> },
        {
          path: 'categories',
          element: <CategoriesPage />,
          children: categoriesList.map((category) => ({
            path: `/categories/${category.id}`,
            element: <ProductsCategoryPage category={category} />,
          })),
        },
        {
          path: 'stores',
          element: <StoresPage />,
          children: storesList.map((store) => ({
            path: `/stores/${store.id}`,
            element: <ProductsStorePage store={store} />,
          })),
        },
        {
          path: 'products',
          element: <ProductsPage />,
          children: [
            { path: '/products/:prodId', element: <ProductDetailPage /> },
          ],
        },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
