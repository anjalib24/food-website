import React from 'react'
import { loadStripe } from '@stripe/stripe-js';

const Strip = () => {

    const stripe =  loadStripe("pk_test_51OH1OpSIyMxB5x7k2X8IKDlmuOOQUSW6OZhUHTOf19w9V8mufbMwJYiGZn02U1SelvQmZFHq6yotMk8FPzKEiN74003RN1uHXW");

  const payment = async () => {
   
    const response = await fetch('http://127.0.0.1:8000/api/v1/order/create-order/65814031e41b0d42e9cb33ad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const sessionID = response?.data?.data?.session_id

    console.log(sessionID,"idddd");
    const result = await stripe.redirectToCheckout({
      sessionId: sessionID,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <form>
      <button onClick={payment}>
        Pay
      </button>
    </form>
  );
};

export default Strip;