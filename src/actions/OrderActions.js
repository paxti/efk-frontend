'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import OrderConstants from '../constants/OrderConstants';
import ClientAPI from '../utils/ClientAPI';

export default {

  recieveOrders: () => {
    ClientAPI
      .sendGetRequest('/order_requests')
      .then(orders => {
        AppDispatcher.dispatch({
          actionType: OrderConstants.RECIEVE_ORDERS,
          orders: orders
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: OrderConstants.RECIEVE_ORDERS_ERROR,
          message: message
        });
      });
  },

  getOrder: (id) => {
    ClientAPI
    .sendGetRequest('/order_requests/' + id)
    .then(order => {
      AppDispatcher.dispatch({
        actionType: OrderConstants.RECIEVE_ORDER,
        order: order
      });
    })
    .catch(message => {
      AppDispatcher.dispatch({
        actionType: OrderConstants.RECIEVE_ORDER_ERROR,
        message: message
      });
    });
  }
}
