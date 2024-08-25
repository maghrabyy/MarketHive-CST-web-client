import { useEffect, useState } from 'react';
import { EmptyList } from '../../Components/EmptyList';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Spin } from 'antd';
import CartList from '../../Components/CartDetails-comp/CartList';
import OrderSummary from '../../Components/CartDetails-comp/OrderSummary';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartLoading, setIsCartLoading] = useState(true);
  const auth = getAuth();

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
  return (
    <div className="container paddingX space-y-2 py-4">
      {isCartLoading ? (
        <Spin />
      ) : cartItems.length > 0 ? (
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartList cartItems={cartItems} setCartItems={setCartItems} />
          </div>
          <div>
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      ) : (
        <EmptyList type={'cart'} />
      )}
    </div>
  );
}
