'use strict';

import React, { PropTypes as T } from 'react'
import { EventEmitter } from 'events'
import auth0 from 'auth0-js'
import LoginStore from '../stores/LoginStore';

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
        browserHistory.replace('/home')
      }
    })
  }


  // login(params) {
  //   this.auth0.client.login({
  //     realm: 'Username-Password-Authentication',
  //     params['username'],
  //     params['password']
  //   }, (err, authResult) => {
  //     if (err) {
  //       alert('Error: ' + err.description)
  //       return
  //     }
  //     if (authResult && authResult.idToken && authResult.accessToken) {
  //       this.setToken(authResult.accessToken, authResult.idToken)
  //       browserHistory.replace('/home')
  //     }
  //   })
  // }

  parseHash(hash) {
    this.auth0.parseHash({ hash }, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setToken(authResult.accessToken, authResult.idToken)
        browserHistory.replace('/home')
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
    // Checks if there is a saved token and it's still valid
    const token = this.getToken()
    return !!token && !isTokenExpired(token)
  }

  setToken(accessToken, idToken) {
    // Saves user access token and ID token into local storage
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('id_token', idToken)
  }

  setProfile(profile) {
    // Saves profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile))
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from localStorage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
  }

  // parseHash(hash) {
  //   const authResult = this.auth0.parseHash(hash)
  //   if (authResult && authResult.idToken) {
  //     this.setToken(authResult.idToken)
  //   }
  // }
  //
  // loggedIn() {
  //   return !!this.getToken()
  // }
  //
  // setToken(idToken) {
  //   localStorage.setItem('id_token', idToken)
  // }
  //
  // getToken() {
  //   return localStorage.getItem('id_token')
  // }
  //
  // logout() {
  //   localStorage.removeItem('id_token');
  // }
}
