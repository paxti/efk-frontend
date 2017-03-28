'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import LoginActions from '../constants/LoginActions'

const Actions = {

  loginUser(profile, token, refreshToken) {

    AppDispatcher.dispatch({
      actionType: LoginActions.LOG_IN,
      token: token,
      profile: profile,
      refreshToken: refreshToken
    });
  },

  logoutUser() {
    AppDispatcher.dispatch({
      actionType: LOG_OUT
    });
  }

};

export default Actions;
