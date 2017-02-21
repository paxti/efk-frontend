'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import Constants from '../constants/Constants'
import OrderWizzardConstants from '../constants/OrderWizzardConstants'
import ClientAPI from '../utils/ClientAPI';

const Actions = {

  setEvent: (selectedEvent) => {
    AppDispatcher.dispatch({
      actionType: OrderWizzardConstants.ORDER_WIZZARD_SELECT_EVENT,
      selectedEvent: selectedEvent
    });
  },

  setConfiguration: (selectedConfiguration, selectedEvent) => {
    ClientAPI
      .sendGetRequest('/configurations/' + selectedConfiguration.id)
      .then(configuration => {
        AppDispatcher.dispatch({
          actionType: OrderWizzardConstants.ORDER_WIZARD_RECIVE_CONFIGURATION_DETAILS,
          selectedConfiguration: configuration
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATION_ERROR,
          message: message
        });
      });
  },

  checkAvailability: (configuration, selectedEvent) => {

    AppDispatcher.dispatch({
      actionType: OrderWizzardConstants.ORDER_WIZZARD_CHECK_AVAILABILITY,
      show_loading: true
    });

    ClientAPI
      .sendGetRequest('/boms/' + configuration.bom.id + '/stock?event_id=' + selectedEvent.id)
      .then(stockAvailability => {
        AppDispatcher.dispatch({
          actionType: OrderWizzardConstants.ORDER_WIZZARD_CHECK_AVAILABILITY_SUCCESS,
          stockAvailability: stockAvailability
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.ORDER_WIZZARD_CHECK_AVAILABILITY_ERROR,
          message: message
        });
      });
  },


  rentNecessary: (stockAvalityProblems) => {
    AppDispatcher.dispatch({
      actionType: OrderWizzardConstants.ORDER_WIZZARD_RENT_NECESSARY,
      stockAvalityProblems: stockAvalityProblems
    });
  },

  removeEvent: () => {
    AppDispatcher.dispatch({
      actionType: OrderWizzardConstants.ORDER_WIZZARD_REMOVE_SELECT_EVENT
    });
  }
};

export default Actions;
