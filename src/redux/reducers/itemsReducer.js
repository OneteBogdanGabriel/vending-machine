import { ActionType } from 'redux-promise-middleware';
import * as types from '../actions/actionTypes';

const LOAD_ITEMS_PENDING = `LOAD_ITEMS_${ActionType.Pending}`;
const LOAD_ITEMS_FULFILLED = `LOAD_ITEMS_${ActionType.Fulfilled}`;
const LOAD_ITEMS_REJECTED = `LOAD_ITEMS_${ActionType.Rejected}`;

export default function itemsReducer(state = [], action) {
  console.log('itemsReducer', state, action);
  switch (action.type) {
    case types.UPDATE_ITEM_SUCCESS:
      // return state.map((item) => (item.id === action.item.id ? action.item : item));
      console.log('REDUCER ACTION ', action);
      console.log('REDUCER STATE ', state);
      return [{ ...action.payload.item }];
    // case types.LOAD_ITEMS_SUCCESS:
    //   return action.payload.items;
    case types.SELECT_ITEM_SUCCESS:
      return action.item;

    case LOAD_ITEMS_PENDING:
      return null;

    case LOAD_ITEMS_FULFILLED:
      return {
        isFulfilled: true,
        data: action.payload[action.meta.selector],
      };

    case LOAD_ITEMS_REJECTED:
      return {
        isRejected: true,
        error: action.payload,
      };
    default:
      return state;
  }
}
