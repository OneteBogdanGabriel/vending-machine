import * as types from './actionTypes';
import * as itemApi from '../../api/itemApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

// export const loadItemsAction = () => ({
//   type: types.LOAD_ITEMS,
//   payload: Promise.resolve(itemApi.getItems()),
// });

// export function loadItems() {
//   return (dispatch) => {
//     dispatch(loadItemsAction());
//   };
// }

export function loadItems() {
  return fetch('http://localhost:3000/machine').then((response) => response.json());
}

export const loadItemsAction = () => ({
  type: types.LOAD_ITEMS,
  payload: loadItems(),
  meta: {
    selector: 'items',
  },
});

export function updateItemSuccess(item) {
  return { type: types.UPDATE_ITEM_SUCCESS, payload: item };
}

export function updateItemSlot(item) {
  console.log('REDUCER ITEM ', item);
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
