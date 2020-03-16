import * as types from '../actions/actionTypes';

export default function itemsReducer(state = [], action) {
  switch (action.type) {
    case types.UPDATE_ITEM_SUCCESS:
      // return state.map((item) => (item.id === action.item.id ? action.item : item));
      return [{ ...action.item }];
    case types.LOAD_ITEMS_SUCCESS:
      return action.payload.items;
    case types.SELECT_ITEM_SUCCESS:
      return action.item;
    default:
      return state;
  }
}
