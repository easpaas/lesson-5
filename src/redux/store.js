import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from './root-reducer';

const middlerwares = [thunk];

// only displays logger in development
if (process.env.NODE_ENV === 'development') {
  middlerwares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlerwares));

export const persistor = persistStore(store);

export default { store, persistor };
