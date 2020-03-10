import * as types from '../actions/actionTypes';

export default function itemsReducer(state = [], action) {
  console.log('ACTION ', action);
  switch (action.type) {
    case types.UPDATE_ITEM_SUCCESS:
      // return state.map((item) => (item.id === action.item.id ? action.item : item));
      console.log('UPDATE ACTION SUCCESS', action.item);
      return [...state, { ...action.item }];
    case types.LOAD_ITEMS_SUCCESS:
      return action.items;
    case types.SELECT_ITEM_SUCCESS:
      return action.item;
    default:
      return state;
  }
}
