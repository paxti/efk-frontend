// import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this))
    this._user = null;
    this._jwt = null;
    this._error = null;
  }


  _registerToActions(action) {
    switch(action.actionType) {
      case 'LOGIN_USER':
        this._jwt = action.jwt;
        this._user = jwt_decode(this._jwt);
        this.emitChange();
        break;
      case 'LOGOUT_USER':
        this._user = null;
        this.emitChange();
        break;
      case 'AUTH_ERROR':
        this._error = action.error;
        this.emitChange();
      default:
        break;
    };
  }

  get user() {
    return this._user;
  }

  get jwt() {
    return this._jwt;
  }

  get error(){
    return this._error;
  }

  isLoggedIn() {
    return !!this._user;
  }
}

export default new LoginStore();
