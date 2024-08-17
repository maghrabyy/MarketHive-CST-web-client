import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';

export const useFetchCustomer = (customerId) => {
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const fetchedCustomer = await getDoc(doc(db, 'Customers', customerId));
        setCustomer({ ...fetchedCustomer.data(), id: fetchedCustomer.id });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchCustomer();
  }, [customerId]);
  return { customer, isLoading, error };
};
