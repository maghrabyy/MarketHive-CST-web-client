import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useFetchData = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const unsubscribeProducts = onSnapshot(
      collection(db, 'Products'),
      (snapshot) => {
        const fetchedProducts = snapshot.docs.map((doc) => ({
          id: doc.id,
          categoryId: doc.data().categoryId, // Include categoryId
          storeId: doc.data().storeId, // Include storeId
          ...doc.data(),
        }));
        setProducts(fetchedProducts);
      },
    );
    const unsubscribeCategories = onSnapshot(
      collection(db, 'Categories'),
      (snapshot) => {
        const fetchedCategories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(fetchedCategories);
      },
    );
    const unsubscribeStores = onSnapshot(
      collection(db, 'Stores'),
      (snapshot) => {
        const fetchedStores = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStores(fetchedStores);
      },
    );
    return () => {
      unsubscribeProducts;
      unsubscribeCategories;
      unsubscribeStores;
    };
  }, []);
  return { products, categories, stores };
};

export default useFetchData;
