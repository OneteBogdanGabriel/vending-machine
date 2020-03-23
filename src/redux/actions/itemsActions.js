import * as types from './actionTypes';
import { updateItem, getItems } from '../../api/itemApi';


// This also works, but it relies on a fetch, and uses the loadItems Action Creator for payload
// export function loadItems() {
//   return fetch('http://localhost:3000/machine').then((response) => response.json());
// }

// export const loadItemsAction = () => ({
//   type: types.LOAD_ITEMS,
//   payload: loadItems(),
//   meta: {
//     selector: 'items',
//   },
// });

// This one relies on the Promise Middleware to handle the dispatching, response, thunk things,
// and it calls the functions in itemApi directly, instead of relying on the action to make a call to the api,
// and the api to figure out the rest
// selector is used because we receive all the db data and need to select the items from it, without moneyStash
export function loadItemsAction() {
  return { type: types.LOAD_ITEMS, payload: getItems(), meta: { selector: 'items' } };
}

export function updateItemAction(item) {
  return { type: types.UPDATE_ITEM_SUCCESS, payload: updateItem(item) };
}
