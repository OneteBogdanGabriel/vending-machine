import { combineReducers } from 'redux';
import items from './itemsReducer';
import moneyStash from './moneyReducer';

const rootReducer = combineReducers({
  items,
  moneyStash,
});

export default rootReducer;
