import * as types from './actionTypes';
import { getMoney, updateMoney } from '../../api/moneyApi'; //* as moneyApi
// import { beginApiCall, apiCallError } from './apiStatusActions';

export function loadMoneyAction() {
  return { type: types.LOAD_MONEY, payload: getMoney(), meta: { selector: 'moneyStash' } };
}

export function updateMoneyAction(moneyStash) {
  return { type: types.UPDATE_MONEY, payload: updateMoney(moneyStash) };
}

// This way involves using a Thunk, inside of which you make the api call and
// dispatch the action creator, which is defined separatly
// export function loadMoneySuccess(moneyStash) {
//   return { type: types.LOAD_MONEY_SUCCESS, payload: moneyStash };
// }

// export function loadMoney() {
//   return function (dispatch) {
//     dispatch(beginApiCall());
//     return moneyApi
//       .getMoney()
//       .then((moneyStash) => {
//         dispatch(loadMoneySuccess(moneyStash));
//       })
//       .catch((error) => {
//         throw error;
//       });
//   };
// }

// export function updateMoneyAction(money) {
//   return function (dispatch) {
//     dispatch(beginApiCall());
//     return updateMoney(money)
//       .then(dispatch(updateMoneySuccess(money)))
//       .catch((error) => {
//         dispatch(apiCallError(error));
//         throw error;
//       }); // .ignoreElements()
//   };
// }
