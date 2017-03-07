import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, IndexRoute, IndexRedirect, Router, Route, Link } from 'react-router'

import AuthService from './utils/AuthService'
import LoginStore from './stores/LoginStore';

const auth = new AuthService('Nixjergdebr8vH7eRYni7MXK3gQSKtTK', 'gatewayexhibits.auth0.com');

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const parseAuthHash = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.parseHash(nextState.location.hash)
  }
}

import Main from './components/Main';
import Login from './components/Login';
import MainApp from './components/MainApp';
import ThreeColumnsWrapper from './components/ThreeColumnsWrapper'
import Sidebar from './components/Sidebar'
import MainGraphicDashboard from './components/MainGraphicDashboard'
import EventsBox from './components/EventsBox'
import DataTable from './components/DataTable'
import MainSectionContainer from './components/MainSectionContainer'
import Orders from './components/Orders'
import Dashboard from './components/Dashboard'
import Inventory from './components/Inventory'
import Configurations from './components/Configurations'
import OrderWrapper from './components/OrderWrapper'
import OrderWizzard from './components/OrderWizzard'
import OrderDetails from './components/OrderDetails'


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main} auth={auth}>
      <IndexRedirect to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/home" component={MainApp}>
        <Route path="/home/dashboard" component={Dashboard} />
        <Route path="/home/make-order" component={OrderWizzard} />
        <Route path="/home/configurations" component={Configurations} />
        <Route path="/home/orders">
           <IndexRoute component={Orders}/>
           <Route path=":orderId" component={OrderDetails} />
        </Route>
        <Route path="/home/inventory" component={Inventory} />
      </Route>
    </Route>
  </Router>
  , document.getElementById('app'));
