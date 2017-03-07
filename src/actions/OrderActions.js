'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import OrderConstants from '../constants/OrderConstants';
import ClientAPI from '../utils/ClientAPI';

export default {

  fetchOrders: () => {
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

  fetchOrder: (id) => {
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
  },

  putOrder: (payload) => {
    ClientAPI
    .sendPostRequest('/order_requests', payload)
    .then(orderRequest => {
      AppDispatcher.dispatch({
        actionType: OrderConstants.ORDER_POSTED,
        orderRequest: orderRequest
      });
    })
    .catch(message => {
      console.log(message);
    });
  }
}
