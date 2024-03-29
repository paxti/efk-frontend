'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants } from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _orders = [];
let _order = {};
let _ordersRequestStatus = true;

function setOrders(orders) {
  _orders = orders;
}

function setOrder(order) {
  _order = order;
}

function setOrdersRequestStatus(requestStatus){
  _ordersRequestStatus = requestStatus;
}

class OrderStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getOrders() {
    return _orders;
  }

  getOrder() {
    return _order;
  }

  getOrdersRequestStatus() {
    return _ordersRequestStatus;
  }

}

const OrderStore = new OrderStoreClass();

OrderStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case NetworkConstants.RECIEVE_ORDERS:
      setOrdersRequestStatus(action.isLoading);
      OrderStore.emitChange();
      break

    case NetworkConstants.RECIEVE_ORDERS_SUCCESS:
      setOrdersRequestStatus(false);
      setOrders(action.orders);
      OrderStore.emitChange();
      break

    case NetworkConstants.RECIEVE_ORDERS_ERROR:
      setOrdersRequestStatus(false);
      OrderStore.emitChange();
      break

    case NetworkConstants.RECIEVE_ORDER:
      setOrder(action.order);
      OrderStore.emitChange();
      break

    case NetworkConstants.RECIEVE_ORDER_ERROR:
      OrderStore.emitChange();
      break

    case NetworkConstants.RECIEVE_ORDER_ERROR:
      OrderStore.emitChange();
      break

    default:
  }

});

export default OrderStore;
