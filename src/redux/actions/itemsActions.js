import * as types from './actionTypes';
import * as itemApi from '../../api/itemApi';
import { beginApiCall, apiCallError } from './apiStatusActions';


export function loadItemsSuccess(items) {
  return { type: types.LOAD_ITEMS_SUCCESS, payload: items };
}

export function loadItems() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return itemApi
      .getItems()
      .then((items) => {
        dispatch(loadItemsSuccess(items));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateItemSuccess(item) {
  return { type: types.UPDATE_ITEM_SUCCESS, item };
}

export function updateItemSlot(item) {
  return (dispatch) => {
    dispatch(beginApiCall());
    return itemApi
      .updateItem(item)
      .then(dispatch(updateItemSuccess(item)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
