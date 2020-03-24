// import { ActionType } from 'redux-promise-middleware';
import * as types from '../actions/actionTypes';

// const LOAD_ITEMS_PENDING = `LOAD_ITEMS_${ActionType.Pending}`;
// const LOAD_ITEMS_FULFILLED = `LOAD_ITEMS_${ActionType.Fulfilled}`;
// const LOAD_ITEMS_REJECTED = `LOAD_ITEMS_${ActionType.Rejected}`;

export default function itemsReducer(state = [], action) {
  console.log('itemsReducer', state, action);
  switch (action.type) {
    case types.UPDATE_ITEM_PENDING:
      return {
        ...state.items,
        isFulfilled: false,
        data: [],
        pending: true,
      };
    case types.UPDATE_ITEM_FULFILLED:
      // item, items => updated items
      // return state.items.map((item) => (item.id === action.item.id ? action.item : item));
      console.log('PAYLOAD REDUCER ',action.payload);
      return {
        ...state.items,
        isFulfilled: true,
        pending: false,
        data: [...action.payload],// indexof si slice
      };
    case types.UPDATE_ITEM_REJECTED:
      return {
        ...state.items,
        pending: false,
        error: action.payload,
      };
    case types.LOAD_ITEMS_PENDING:
      return {
        ...state.items,
        isFulfilled: false,
        data: [],
        pending: true,
      };

    case types.LOAD_ITEMS_FULFILLED:
      return {
        ...state.items,
        isFulfilled: true,
        pending: false,
        data: action.payload[action.meta.selector],
      };

    case types.LOAD_ITEMS_REJECTED:
      return {
        ...state.items,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
