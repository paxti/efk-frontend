'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import OrderWizzardConstants from '../constants/OrderWizzardConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _selectedEvent = null;

function setSelectedEvent(event) {
  _selectedEvent = event;
}

class OrderWizzardStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getSelectedEvent() {
    return _selectedEvent;
  }

}

const OrderWizzardStore = new OrderWizzardStoreClass();

OrderWizzardStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case OrderWizzardConstants.ORDER_WIZZARD_SELECT_EVENT:
      setSelectedEvent(action.selectedEvent);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZZARD_REMOVE_SELECT_EVENT:
      setSelectedEvent(null);
      OrderWizzardStore.emitChange();
      break

    default:
  }

});

export default OrderWizzardStore;
