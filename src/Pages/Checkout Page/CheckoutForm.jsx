import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { RiVisaFill } from 'react-icons/ri';
import { FaCcMastercard } from 'react-icons/fa6';
import { Button } from 'antd';

export const CheckoutForm = ({ totalAmount, placeOrderHandler }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } else {
      const response = await fetch(
        'https://markethive-stripe-payment.vercel.app/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount * 100,
            currency: 'usd',
          }),
        },
      );

      const paymentIntent = await response.json();

      const confirmPayment = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: paymentMethod.id,
        },
      );

      if (confirmPayment.error) {
        setErrorMessage(confirmPayment.error.message);
      } else {
        placeOrderHandler();
      }
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="card-holder-name flex flex-col">
        <label htmlFor="cardHolderName">Card Holder</label>
        <input
          id="cardHolderName"
          placeholder="e.g John Doe"
          className="border border-gray-slate-800 rounded-md p-2"
          required
        />
      </div>
      <div className="card-num flex flex-col">
        <div className="flex justify-between">
          <label htmlFor="cardNumber">Card Number</label>
          <div className="flex gap-2">
            <RiVisaFill />
            <FaCcMastercard />
          </div>
        </div>
        <CardElement className="border border-gray-slate-800 rounded-md p-2" />
      </div>
      <Button
        type="primary"
        loading={isLoading}
        className="w-full font-semibold"
        disabled={isLoading || !stripe || !elements}
        onClick={handleSubmit}
      >
        PLACE ORDER
      </Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};
