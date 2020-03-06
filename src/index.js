import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './redux/store/configureStore';
// import * as serviceWorker from './serviceWorker';
// import initialState from './redux/reducers/initialState';

// const store = configureStore(initialState);
const store = configureStore();
console.log('Store',store);
render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// serviceWorker.unregister();
