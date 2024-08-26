import { useState } from 'react';
import cash from '../../assets/cash.png';
import valu from '../../assets/valu.jpeg';
import credit from '../../assets/Wallet-pana.png';
const PaymentMethod = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    {
      id: 1,
      name: 'Debit/Credit Card',
      imageSrc: credit,
    },
    {
      id: 2,
      name: 'ValU',
      imageSrc: valu,
    },
    {
      id: 3,
      name: 'Cash On Delivery',
      imageSrc: cash,
    },
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
      <div className="flex flex-wrap gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedPayment(method.id)}
            className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer ${
              selectedPayment === method.id
                ? ' border-blue-500'
                : 'bg-white border-gray-200'
            }`}
          >
            <img
              src={method.imageSrc}
              alt={method.name}
              className="w-12 h-10"
            />
            <p
              className={`text-lg font-medium ${
                selectedPayment === method.id
                  ? 'text-blue-500'
                  : 'text-gray-800'
              }`}
            >
              {method.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
