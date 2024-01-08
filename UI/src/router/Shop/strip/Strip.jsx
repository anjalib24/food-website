import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import * as jwt_decode from "jwt-decode";


const Strip = () => {


  const payment = async () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;

    const stripe = await loadStripe("pk_test_51OH1OpSIyMxB5x7k2X8IKDlmuOOQUSW6OZhUHTOf19w9V8mufbMwJYiGZn02U1SelvQmZFHq6yotMk8FPzKEiN74003RN1uHXW");

    const response = await fetch(`/api/api/v1/order/create-order/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const {data} =  await response.json()
    const sessionID = data?.sessionID
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