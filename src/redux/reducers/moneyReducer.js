// import { ActionType } from 'redux-promise-middleware';
import * as types from '../actions/actionTypes';

// const LOAD_MONEY_PENDING = `LOAD_MONEY_${ActionType.Pending}`;
// const LOAD_MONEY_FULFILLED = `LOAD_MONEY_${ActionType.Fulfilled}`;
// const LOAD_MONEY_REJECTED = `LOAD_MONEY_${ActionType.Rejected}`;

export default function moneyReducer(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_MONEY_PENDING:
      return {
        ...state.moneyStash,
        isFulfilled: false,
        pending: true,
      };
    case types.UPDATE_MONEY_FULFILLED:
      return {
        ...state.moneyStash,
        isFulfilled: false,
        data: { ...action.payload },
        pending: true,
      };
    case types.UPDATE_MONEY_REJECTED:
      return {
        ...state.moneyStash,
        pending: false,
        error: action.payload,
      };
    case types.LOAD_MONEY_PENDING:
      return {
        ...state.moneyStash,
        isFulfilled: false,
        pending: true,
      };

    case types.LOAD_MONEY_FULFILLED:
      return {
        ...state.moneyStash,
        isFulfilled: true,
        pending: false,
        data: action.payload[action.meta.selector],
      };

    case types.LOAD_MONEY_REJECTED:
      return {
        ...state.moneyStash,
        pending: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
