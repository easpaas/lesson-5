import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51GylP3A767XgCBwd2XvHeShLOM8dN8x05sHjnHF4rjEZE9292GDZsdFy4VVGVgTIJAEeIhQQ8BFrSXft7COhWMHT00ignIcL00';

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