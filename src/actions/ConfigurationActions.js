'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import ClientAPI from '../utils/ClientAPI';

export default {

  receiveConfigurations: () => {
    ClientAPI
      .sendGetRequest('/configurations')
      .then(configurations => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATIONS,
          configurations: configurations,
          request_status: false
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATIONS_ERROR,
          message: message,
          request_status: false
        });
      });
  },

  recieveConfigurationDetails: (id) => {
    ClientAPI
      .sendGetRequest('/configurations/' + id)
      .then(configuration => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATION_DETAILS,
          configuration: configuration
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATION_ERROR,
          message: message
        });
      });
  }
}
