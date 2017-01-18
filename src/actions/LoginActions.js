import AppDispatcher from '../dispatchers/AppDispatcher.js';
import LoginActionTypes from '../constants/LoginActionTypes.js';
import RouterContainer from '../utils/RouterContainer'

const Actions = {

  saveUser(user, jwt) {
    AppDispatcher.dispatch({
      type: LoginActionTypes.SAVE_USER,
      user: user,
      jwt: jwt
    })
  }


  // loginUser(jwt) {
  //   // var savedJwt = localStorage.getItem('jwt');
  //   AppDispatcher.dispatch({
  //     actionType: LOG_IN,
  //     jwt: jwt
  //   });
  // },
  //
  // logoutUser() {
  //   RouterContainer.get().transitionTo('/login');
  //   localStorage.removeItem('jwt');
  //   AppDispatcher.dispatch({
  //     actionType: LOG_OUT
  //   });
  // },
  //
  // authontificationError(error) {
  //   AppDispatcher.dispatch({
  //     actionType: ERROR
  //   });
  // }

};

export default Actions;
