import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Checkout";

const stripePromise = loadStripe("pk_test_51SzGQG1lo7Nq3ghv7JDAf30SqlJ7sG80j6DiWV1LDR1Pkt1hQvdVB9L05nuu8qWNtzi2OzxBpYsLTIIxvBB7KJUJ004GG57avG");

const CheckoutWrapper = () => {
  const { state } = useLocation();

  const clientSecret = state?.checkoutData?.clientSecret;

  if (!clientSecret) {
    return <div style={{ padding: "50px" }}>Invalid payment session</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Checkout />
    </Elements>
  );
};

export default CheckoutWrapper;