import { getDocs, query, collection, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useState, useEffect } from 'react';

export const useFetchCartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    const fetchShoppingCartData = async () => {
      const user = auth.currentUser;
      if (user) {
        const customerId = user.uid;
        const shoppingCartQuery = query(
          collection(db, 'ShoppingCart'),
          where('customerId', '==', customerId),
        );
        const cartSnapshot = await getDocs(shoppingCartQuery);
        const cartData = cartSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(cartData);
        setIsCartLoading(false);
      }
    };
    fetchShoppingCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { cartItems, setCartItems, isCartLoading };
};
