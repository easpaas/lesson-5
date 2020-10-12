import { TOGGLE_CART_HIDDEN, ADD_ITEM_TO_CART, CLEAR_ITEM_FROM_CART } from './cart.types';
import { addItemToCart } from './cart.utils'; 

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
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state, 
        cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
      }
    default: 
      return state;
  }
};

export default CartReducer;