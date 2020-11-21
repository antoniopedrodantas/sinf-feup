import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './scenes/Login/Login';
import Overview from './scenes/Overview/Overview';
import Sales from './scenes/Sales/Sales';
import Purchases from './scenes/Purchases/Purchases';
import Financial from './scenes/Financial/Financial';
import Stock from './scenes/Stock/Stock';
import NotFound from './scenes/Static/NotFound';

import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/overview" exact component={Overview} />
        <Route path="/sales" exact component={Sales} />
        <Route path="/purchases" exact component={Purchases} />
        <Route path="/financial" exact component={Financial} />
        <Route path="/stock" exact component={Stock} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};


export default App;
