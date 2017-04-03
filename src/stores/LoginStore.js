'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants } from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

function setUser(profile, token, refreshToken) {
  if (!localStorage.getItem('id_token')) {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('id_token', token);
    localStorage.setItem('refresh_token', refreshToken);
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

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}

const AuthStore = new LoginStoreClass();

AuthStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case NetworkConstants.LOG_IN:
      setUser(action.profile, action.token, action.refreshToken);
      AuthStore.emitChange();
      break

    case NetworkConstants.LOG_OUT:
      removeUser();
      AuthStore.emitChange();
      break

    default:
  }

});

export default AuthStore;
