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
import Home from './components/Home';
import Login from './components/Login';
import MainApp from './components/MainApp';


ReactDOM.render(

  <Router history={browserHistory}>
    <Route path="/" component={Main} auth={auth}>
      <IndexRedirect to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/home" component={MainApp} >
        <Route path="/home/dashboard" name="Home" component={Home} />
      </Route>
    </Route>
  </Router>
  , document.getElementById('app'));
