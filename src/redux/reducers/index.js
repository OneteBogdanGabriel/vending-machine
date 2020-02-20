import { combineReducers } from "redux";
import items from "./itemsReducer";
import money from "./moneyReducer";
import api from "./apiStatusReducer";

const rootReducer = combineReducers({
  api,
  items,
  money
});

export default rootReducer;
