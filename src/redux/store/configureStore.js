import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";

export default function configureStore(initialState) {
  //add support for redux devtools

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(ReduxThunk, logger)
  );
}
