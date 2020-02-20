import * as types from "./actionTypes";
import * as moneyApi from "../../api/moneyApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";


export function loadMoneySuccess(money) {
  return { type: types.LOAD_MONEY_SUCCESS, money };
}

export function loadMoney() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return moneyApi
      .getMoney()
      .then(money => {
        dispatch(loadMoneySuccess(money));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateMoneySuccess(money) {
    return { type: types.UPDATE_MONEY_SUCCESS, money };
  }

export function updateMoney(money) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return moneyApi
      .updateMoney(money)
      .then(dispatch(updateMoneySuccess(money))
      )
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
