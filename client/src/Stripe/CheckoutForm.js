import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      if (props.userInSession) {
        console.log("Stripe 23 | token generated!", paymentMethod);
        try {
          const { id } = paymentMethod;
          const response = await axios.post(
            "http://localhost:5000/stripe/charge",
            {
              amount: props.amount * 100,
              id: id,
            }
          );
  
          console.log("Stripe 35 | data", response.data.success);
          if (response.data.success) {
            console.log("CheckoutForm.js 25 | payment successful!");
            props.addOrder(event);
          }
        } catch (error) {
          console.log("CheckoutForm.js 28 | ", error);
        }
      } else {
        props.history.push("/login");
      }
    } else {
      console.log(error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} style={{ width: 312 }} className="m-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-orange my-3" type="submit">
        Payer
      </button>
    </form>
  );
};