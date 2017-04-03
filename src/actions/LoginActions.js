'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import { NetworkConstants } from '../constants/Constants'

const Actions = {

  loginUser(profile, token, refreshToken) {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.LOG_IN,
      token: token,
      profile: profile,
      refreshToken: refreshToken
    });
  },

  logoutUser() {
    AppDispatcher.dispatch({
      actionType: NetworkConstants.LOG_OUT
    });
  }

};

export default Actions;
