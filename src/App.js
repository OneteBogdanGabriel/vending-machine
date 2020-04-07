import React from 'react';
import { Route, Switch } from 'react-router-dom';
import VendingMachine from './components/machine/VendingMachine';
import AboutPage from './components/about/AboutPage';
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/" component={AboutPage} />
        <Route path="/machine" component={VendingMachine} />
      </Switch>
    </div>
  );
}

export default App;
