import { TOGGLE_CART_HIDDEN, ADD_ITEM_TO_CART } from './cart.types';

const INITIAL_STATE = {
  hidden: true,
  items: []
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
        items: [
          ...state.items,
          action.payload
        ]
      }
      
    default: 
      return state;
  }
};

export default CartReducer;