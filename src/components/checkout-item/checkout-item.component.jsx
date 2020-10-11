import React from 'react';

import './checkout-item.styles.scss';

const CheckoutItem = ({ item }) => {
  const {name, price, quantity, imageUrl } = item;
  return (
    <div className='checkout-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='checkout-footer'>
        <span className='name'>{name}</span>
        <span className='quantity'>{quantity}</span>
        <span className='price'>{price}</span>
      </div>
    </div>
  );
};

export default CheckoutItem;