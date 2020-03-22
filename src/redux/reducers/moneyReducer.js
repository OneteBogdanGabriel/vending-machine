import * as types from '../actions/actionTypes';

export default function moneyReducer(state = {}, action) {
  switch (action.type) {
    case types.UPDATE_MONEY_SUCCESS:
      return action.payload;
    case types.LOAD_MONEY_SUCCESS:
      return action.payload.moneyStash;
    default:
      return state;
  }
}
