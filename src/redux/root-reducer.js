import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//localStorage as default storage
import storage from 'redux-persist/lib/storage'; 

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistConfig = {
  key: 'root',
  storage, 
  //the only thing wanting to whitelist is cartReducer
  whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);