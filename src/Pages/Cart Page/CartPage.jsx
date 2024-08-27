import { EmptyList } from '../../Components/EmptyList';
import { Spin } from 'antd';
import CartList from '../../Components/CartDetails-comp/CartList';
import OrderSummary from '../../Components/CartDetails-comp/OrderSummary';
import { useFetchCartItems } from '../../Custom Hooks/useFetchCartItems';

export default function CartPage() {
  const { cartItems, setCartItems, isCartLoading } = useFetchCartItems();
  return (
    <div className="container paddingX space-y-2 py-4">
      {isCartLoading ? (
        <Spin />
      ) : cartItems.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-3">
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
