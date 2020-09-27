import { createSelector } from 'reselect';

// createSelector(...inputSelectors | [inputSelectors], resultFunc):
// takes one or more selectors, or an array of selectors 
// and passes them as arguments to resultFunc

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)
);