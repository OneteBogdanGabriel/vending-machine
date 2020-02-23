import * as types from "./actionTypes";
import * as itemApi from "../../api/itemApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";


export function loadItemsSuccess(items) {
  return { type: types.LOAD_ITEMS_SUCCESS, items };
}

export function loadItems() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return itemApi
      .getItems()
      .then(items => {
        dispatch(loadItemsSuccess(items));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateItemSuccess(item) {
    return { type: types.UPDATE_ITEM_SUCCESS, item };
  }

export function updateItem(item) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return itemApi
      .updateItem(item)
      .then(dispatch(updateItemSuccess(item))
      )
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// export function selectItemSuccess(item) {
//   return { type: types.SELECT_ITEM_SUCCESS, item };
// }

// export function selectItem(dispatch, getState) {
//   return itemApi
//     .getItem()
//     .then(item => {
//       dispatch(selectItemSuccess(item));
//     })
//     .catch(error => {
//       throw error;
//     });
// }