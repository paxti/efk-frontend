'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import OrderConstants from '../constants/OrderConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _orders = [];
let _order = {};

function setOrders(orders) {
  _orders = orders;
}

function setOrder(order) {
  _order = order;
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

}

const OrderStore = new OrderStoreClass();

OrderStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case OrderConstants.RECIEVE_ORDERS:
      setOrders(action.orders);
      OrderStore.emitChange();
      break

    case OrderConstants.RECIEVE_ORDER:
      setOrder(action.contact);
      OrderStore.emitChange();
      break

    case OrderConstants.RECIEVE_ORDER_ERROR:
      alert(action.message);
      OrderStore.emitChange();
      break

    case OrderConstants.RECIEVE_ORDER_ERROR:
      alert(action.message);
      OrderStore.emitChange();
      break

    default:
  }

});

export default OrderStore;
