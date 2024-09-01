import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react';

export const useFetchOrders = () => {
  const [order, setOrder] = useState([]);
  const [isOrderLoading, setIsOrderLoading] = useState(true);
  const user = auth.currentUser;
  useEffect(() => {
    if (user) {
      const customerId = user.uid;
      const OrderQuery = query(
        collection(db, 'Orders'),
        where('customerId', '==', customerId),
      );
      onSnapshot(OrderQuery, (orderSnapshot) => {
        const orderData = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrder(orderData);
        setIsOrderLoading(false);
      });
    }
  }, [user]);
  return { order, isOrderLoading };
};
