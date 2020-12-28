import { TOGGLE_CART_HIDDEN, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_ITEM_FROM_CART, CLEAR_ALL_CART_ITEMS } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils'; 

const INITIAL_STATE = {
  hidden: true,
  cartItems: []
};

const CartReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case ADD_ITEM_TO_CART: 
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    case REMOVE_ITEM_FROM_CART: 
      return {
        ...state, 
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      }
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state, 
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
      }
    case CLEAR_ALL_CART_ITEMS: 
      return {
        ...state, 
        cartItems: INITIAL_STATE.cartItems
      }
    default: 
      return state;
  }
};

export default CartReducer;