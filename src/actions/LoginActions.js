'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import LoginActions from '../constants/LoginActions'

const Actions = {

  loginUser(profile, token) {

    AppDispatcher.dispatch({
      actionType: LoginActions.LOG_IN,
      token: token,
      profile: profile
    });
  },

  logoutUser() {
    AppDispatcher.dispatch({
      actionType: LOG_OUT
    });
  }

};

export default Actions;
