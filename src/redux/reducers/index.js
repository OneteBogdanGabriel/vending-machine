import { combineReducers } from 'redux';
import items from './itemsReducer';
import moneyStash from './moneyReducer';
import store from './storeReducer';
import api from './apiStatusReducer';

const rootReducer = combineReducers({
  api,
  items,
  moneyStash,
  store,
});

export default rootReducer;
