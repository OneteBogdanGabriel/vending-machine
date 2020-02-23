import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import configureStore from "./redux/store/configureStore";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import initialState from "./redux/reducers/initialState";

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
