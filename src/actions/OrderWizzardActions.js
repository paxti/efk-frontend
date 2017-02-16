'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import OrderWizzardConstants from '../constants/OrderWizzardConstants'

const Actions = {

  setEvent(selectedEvent) {

    AppDispatcher.dispatch({
      actionType: OrderWizzardConstants.ORDER_WIZZARD_SELECT_EVENT,
      selectedEvent: selectedEvent
    });
  },

  removeEvent() {
    AppDispatcher.dispatch({
      actionType: OrderWizzardConstants.ORDER_WIZZARD_REMOVE_SELECT_EVENT
    });
  }
};

export default Actions;
