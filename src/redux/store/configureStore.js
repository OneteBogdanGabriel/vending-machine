import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  // add support for redux devtools

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(ReduxThunk, logger),
  );
}
