import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route, Link } from 'react-router'

import App from './components/Main';
import OrdersList from './components/OrdersList';
import Inventory from './components/Inventory';

// Render the main component into the dom
ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/orders" component={OrdersList} />
      <Route path="/inventory" component={Inventory} />
      <Route path="*" component={App}/>
    </Route>
  </Router>
  , document.getElementById('app'));
