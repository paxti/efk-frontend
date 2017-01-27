'use strict';

import React, { PropTypes as T } from 'react'
import { EventEmitter } from 'events'
import auth0 from 'auth0-js'
import LoginStore from '../stores/LoginStore'
import { browserHistory } from 'react-router'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()

    this.auth0 = new auth0.WebAuth({
      clientID: clientId,
      domain: domain
    })

    this.login = this.login.bind(this)
  }

  login(username, password) {
    this.auth0.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password,
      scope: 'openid profile'
    }, (err, authResult) => {
      if (err) {
        alert('Error: ' + err.description)
        return
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setToken(authResult.accessToken, authResult.idToken)
        browserHistory.replace('/home/dashboard')
      }
    })
  }

  parseHash(hash) {
    this.auth0.parseHash({ hash }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setToken(authResult.accessToken, authResult.idToken)
        browserHistory.replace('/home/dashboard')
        this.auth0.client.userInfo(authResult.accessToken, (error, profile) => {
          if (error) {
            console.log('Error loading the Profile', error)
          } else {
            this.setProfile(profile)
          }
        })
      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error)
      }
    })
  }

  loggedIn() {
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
    this.emit('profile_updated', profile)
  }

  getProfile() {
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  getToken() {
    return localStorage.getItem('id_token')
  }

  logout() {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }

}
