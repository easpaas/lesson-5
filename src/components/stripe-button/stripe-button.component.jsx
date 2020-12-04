import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_live_51GylP3A767XgCBwdtUsQ4FW77fsj1qQ7gJ2L5quLRA7RELibkJvyok5adOPK6cIGKeQUbsq2khDsQPB0so0oH05800MmcKWLKI';

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }

  return (
    <StripeCheckout 
      label="Pay Now" 
      name="CRWN Clothing" 
      billingAddress 
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your Total is: ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    /> 
  );
}

export default StripeCheckoutButton;