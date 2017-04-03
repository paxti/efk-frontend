'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants } from '../constants/Constants';
import ClientAPI from '../utils/ClientAPI';

export default {

  receiveConfigurations: () => {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECIEVE_CONFIGURATIONS,
      isLoading: true
    });

    ClientAPI
      .sendGetRequest('/configurations')
      .then(configurations => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATIONS_SUCCESS,
          configurations: configurations,
          request_status: false
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATIONS_ERROR,
          message: message,
          request_status: false
        });
      });
  },

  recieveConfigurationDetails: (id) => {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS,
      isLoading: true
    });

    ClientAPI
      .sendGetRequest('/configurations/' + id)
      .then(configuration => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_SUCCESS,
          configuration: configuration
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_ERROR,
          message: message
        });
      });
  }
}
