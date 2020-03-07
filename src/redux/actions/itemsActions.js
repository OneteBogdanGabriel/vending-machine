import * as types from './actionTypes';
import * as itemApi from '../../api/itemApi';
import { beginApiCall, apiCallError } from './apiStatusActions';


export function loadItemsSuccess(items) {
  return { type: types.LOAD_ITEMS_SUCCESS, items };
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
  console.log('We reached here');
  return { type: types.UPDATE_ITEM_SUCCESS, item };
}

export function updateItemSlot(item) {
  console.log('INSIDE ACTIONS item ', JSON.stringify(item));
  return (dispatch) => {
    console.log('HCKING!');
    dispatch(beginApiCall());
    console.log('CEHCKING!');
    return itemApi
      .updateItem(item)
      .then(dispatch(updateItemSuccess(item)))
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
