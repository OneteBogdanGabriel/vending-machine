// import { ActionType } from 'redux-promise-middleware';
import * as types from '../actions/actionTypes';

// const LOAD_ITEMS_PENDING = `LOAD_ITEMS_${ActionType.Pending}`;
// const LOAD_ITEMS_FULFILLED = `LOAD_ITEMS_${ActionType.Fulfilled}`;
// const LOAD_ITEMS_REJECTED = `LOAD_ITEMS_${ActionType.Rejected}`;

export default function itemsReducer(state = {}, action) {
  // combineReducer face automat namepsacing, deci el paseaza doar portiunea de state pt acest reducer si nu cel global
  // punand state.items era inutil in case.
  // dar asta inseamna ca daca reducerul asta ar avea nevoie de state-ul global... :/
  switch (action.type) {
    case types.UPDATE_ITEM_PENDING:
      return {
        ...state,
        isFulfilled: false,
        pending: true,
      };
    case types.UPDATE_ITEM_FULFILLED:
      return {
        ...state,
        isFulfilled: true,
        pending: false,
        data: [...action.payload],
      };
    case types.UPDATE_ITEM_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case types.LOAD_ITEMS_PENDING:
      return {
        ...state,
        isFulfilled: false,
        pending: true,
      };

    case types.LOAD_ITEMS_FULFILLED:
      return {
        ...state,
        isFulfilled: true,
        pending: false,
        data: action.payload[action.meta.selector],
      };

    case types.LOAD_ITEMS_REJECTED:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
