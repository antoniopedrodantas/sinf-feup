import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Login/Login';
import Overview from '../Overview/Overview';
import Sales from '../Sales/Sales';
import Purchases from '../Purchases/Purchases';
import Financial from '../Financial/Financial';
import Stock from '../Stock/Stock';
import NotFound from '../Static/NotFound';
import Client from '../DrillDowns/Client/Client';
import Supplier from '../DrillDowns/Supplier/Supplier';
import Product from '../DrillDowns/Product/Product';


import './styles/App.css';

const App : React.FC = () => {
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
        <Route path="/client/:id" exact component={Client} />
        <Route path="/supplier/:id" exact component={Supplier} />
        <Route path="/product/:id" exact component={Product} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};
export default App;
