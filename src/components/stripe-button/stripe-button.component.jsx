import React from 'react';
import { connect } from 'react-redux';

import { clearAllCartItems } from '../../redux/cart/cart.actions';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price, clearAllCartItems }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51GylP3A767XgCBwd2XvHeShLOM8dN8x05sHjnHF4rjEZE9292GDZsdFy4VVGVgTIJAEeIhQQ8BFrSXft7COhWMHT00ignIcL00';

  const onToken = token => {
    clearAllCartItems();
    alert(`Thanks ${token.card.name}! Your Payment was Successful.`)
  }

  return (
    <StripeCheckout 
      label="Pay Now" 
      name="hONEST Clothing" 
      billingAddress 
      shippingAddress
      // image="https://svgshare.com/i/CUz.svg"
      description={`Your Total is: ${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    /> 
  );
}

const mapDispatchToProps = dispatch => ({
  clearAllCartItems: () => dispatch(clearAllCartItems())
})

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);