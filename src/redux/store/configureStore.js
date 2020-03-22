import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from '../reducers';
import initialState from './initialState';

export default function configureStore() {
  // add support for redux devtools

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(ReduxThunk, promise, logger),
  );
}
