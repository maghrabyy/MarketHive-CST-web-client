import { Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaceOrderModal from '../../Pages/Checkout Page/PlaceOrderModal';

export default function OrderSummary({ cartItems, isDisabled }) {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.subTotal, 0);
  const navigate = useNavigate();
  const wordPlusS = () => {
    if (totalItems == 1) {
      return 'Item';
    } else {
      return 'Items';
    }
  };
  const wordItem = wordPlusS();
  const location = useLocation();
  return (
    <div className="bg-white shadow p-6 rounded-md sticky top-0">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>
            Subtotal ({totalItems} {wordItem})
          </span>
          <span>{subtotal.toLocaleString()} EGP</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="text-green-600 bold font-bold">Free</span>
        </div>
        <Divider />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{subtotal.toLocaleString()} EGP</span>
        </div>
      </div>
      <button
        className={`w-full bg-primary text-white py-3 mt-4 rounded  transition-opacity duration-300 ease-in-out ${isDisabled ? ' cursor-not-allowed opacity-40' : 'opacity-100 cursor-pointer'}  `}
        disabled={isDisabled}
        onClick={() =>
          location.pathname == '/cart'
            ? navigate('/checkout')
            : PlaceOrderModal()
        }
      >
        {location.pathname == '/cart' ? 'Checkout' : 'PLACE ORDER'}
      </button>
    </div>
  );
}