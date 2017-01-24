'use strict';

import LoginView from '../components/LoginView';
import {Container} from 'flux/utils';
import LoginActions from '../actions/LoginActions';
import LoginStore from '../stores/LoginStore';

import logoUrl from '../images/logo.png';
import '../styles/Login.css'

function getStores() {
  return [
    LoginStore
  ];
}

function getState() {
  return {
    login_state: LoginStore.getState(),

    onSaveUser: LoginActions.saveUser
  };
}

export default Container.createFunctional(LoginView, getStores, getState);
