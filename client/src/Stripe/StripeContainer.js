import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51I84ptAwjgq5UqYoqZYTsUOd3X4A5wZ3GamaItoeHhm42satB3uUyuayUaqH2AVw2euf4khhNFx7TtfdRddiFd3c00TkINs3xn";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;