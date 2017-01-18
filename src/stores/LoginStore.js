'use strict';

import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import LoginActionTypes from '../constants/LoginActionTypes.js';
import AppDispatcher from '../dispatchers/AppDispatcher';

class LoginStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return Immutable.Map({
      user: null,
      jwt: null,
      error: null
    });
  }

  reduce(state, action): string {

    switch (action.type) {
      case LoginActionTypes.SAVE_USER:
        return state
        .set('user', action.user)
        .set('jwt', action.jwt)
        .set('error', action.error);

      default:
        return state;
    }
  }
}

export default new LoginStore();
