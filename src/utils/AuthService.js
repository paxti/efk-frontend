'use strict';

import React, { PropTypes as T } from 'react'
import { EventEmitter } from 'events'
import Auth0 from 'auth0-js'
import LoginStore from '../stores/LoginStore';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      responseType: 'token'
    });

    this.login = this.login.bind(this)
  }

  login(params, onError) {
    this.auth0.login(params, onError)
  }

  parseHash(hash) {
    const authResult = this.auth0.parseHash(hash)
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken)
    }
  }

  loggedIn() {
    return !!this.getToken()
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}
