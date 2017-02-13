'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import LoginActions from '../constants/LoginActions';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

function setUser(profile, token) {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', token);
  }
}

function removeUser() {
  localStorage.removeItem('profile');
  localStorage.removeItem('id_token');
}

class LoginStoreClass extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  isAuthenticated() {
    if (localStorage.getItem('id_token')) {
      return true;
    }
    return false;
  }

  getUser() {
    return localStorage.getItem('profile');
  }

  getJwt() {
    return localStorage.getItem('id_token');
  }
}

const AuthStore = new LoginStoreClass();

AuthStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case LoginActions.LOG_IN:
      setUser(action.profile, action.token);
      AuthStore.emitChange();
      break

    case LoginActions.LOG_OUT:
      removeUser();
      AuthStore.emitChange();
      break

    default:
  }

});

export default AuthStore;
