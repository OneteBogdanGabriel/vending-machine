import * as types from './actionTypes';
import * as moneyApi from '../../api/moneyApi';
import { beginApiCall, apiCallError } from './apiStatusActions';


export function loadMoneySuccess(moneyStash) {
  return { type: types.LOAD_MONEY_SUCCESS, moneyStash };
}

export function loadMoney() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return moneyApi;
    // .getMoney()
    // .then((moneyStash) => {
    //   dispatch(loadMoneySuccess(moneyStash));
    // })
    // .catch((error) => {
    //   throw error;
    // });
  };
}

export function updateMoneySuccess(money) {
  return { type: types.UPDATE_MONEY_SUCCESS, money };
}

export function updateMoney(money) {
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return moneyApi
      .updateMoney(money)
      .then(dispatch(updateMoneySuccess(money)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
