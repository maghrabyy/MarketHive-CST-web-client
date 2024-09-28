import { useState } from 'react';
import { useEffect } from 'react';
import ProductsPage from './ProductsPage';
import { BreadCrumb } from '../../Components/BreadCrumb';
import { FaHome } from 'react-icons/fa';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const OffersProductsPage = () => {
  const [offersProducts, setOffersProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchOffersProducts = async () => {
      const offersProducts = await getDocs(collection(db, 'Products'));
      offersProducts.docs.forEach((prodDoc) => {
        setOffersProducts((prevProds) =>
          [...prevProds, { ...prodDoc.data(), id: prodDoc.id }]
            .filter((prod) => Number(prod.discount))
            .sort((a, b) => Number(b.discount) - Number(a.discount)),
        );
      });
      setIsLoading(false);
    };
    fetchOffersProducts();
  }, []);
  return (
    <div className="paddingX py-5 space-y-3">
      <BreadCrumb
        items={[
          {
            href: '/',
            icon: <FaHome />,
            title: 'Home',
          },

          {
            title: 'Offers',
          },
        ]}
      />
      <ProductsPage productsList={offersProducts} isLoading={isLoading} />
    </div>
  );
};
