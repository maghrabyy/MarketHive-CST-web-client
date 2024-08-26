import { auth } from '../../firebase';
import NewShippingAddress from './NewShippingAddress';
import { useCustomerSnapshot } from '../../Custom Hooks/useFetchCustomer';
import { Spin } from 'antd';

function CheckoutPage() {
  const { customer, isLoading } = useCustomerSnapshot(auth.currentUser.uid);

  return (
    <div>
      {isLoading ? (
        <div className="h-full absolute left-1/2 flex flex-col justify-center">
          <Spin size="large" className="self-stretch " />
        </div>
      ) : (
        <NewShippingAddress customerAddress={customer?.address} />
      )}
    </div>
  );
}

export default CheckoutPage;
