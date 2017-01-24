import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, IndexRoute, IndexRedirect, Router, Route, Link } from 'react-router'

import AuthService from './utils/AuthService'
import LoginStore from './stores/LoginStore';

const auth = new AuthService('OaaRzsLcJSodX1LoyCLLkaMaKSwGpxkC', 'app52272635.auth0.com');

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const parseAuthHash = (nextState, replace) => {
  if (nextState.location.hash) {
    auth.parseHash(nextState.location.hash)
    replace({ pathname: '/' })
  }
}

import App from './components/Main';
import Home from './components/Home';
import LoginContainer from './components/LoginContainer';
import Login from './components/Login';
// import OrdersList from './components/OrdersList';
// import Inventory from './components/Inventory';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/login" component={Login} auth={auth} onEnter={parseAuthHash}/>
    <Route path="/" component={App} onEnter={requireAuth}>
      <IndexRedirect to="/home" />
      <IndexRoute component={Home} />
      <Route path="/home" component={Home} onEnter={requireAuth}/>
    </Route>
  </Router>
  , document.getElementById('app'));
