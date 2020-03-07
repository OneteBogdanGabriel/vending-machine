import React from 'react';
import { render } from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './redux/store/configureStore';
// import * as serviceWorker from './serviceWorker';

const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// serviceWorker.unregister();
