'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants } from '../constants/Constants';
import ClientAPI from '../utils/ClientAPI';

export default {

  fetchOrders: () => {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECIEVE_ORDERS,
      isLoading: true
    });

    ClientAPI
      .sendGetRequest('/order_requests')
      .then(orders => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_ORDERS_SUCCESS,
          orders: orders
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_ORDERS_ERROR,
          message: message
        });
      });
  },

  fetchOrder: (id) => {
    ClientAPI
    .sendGetRequest('/order_requests/' + id)
    .then(order => {
      AppDispatcher.dispatch({
        actionType: NetworkConstants.RECIEVE_ORDER,
        order: order
      });
    })
    .catch(message => {
      AppDispatcher.dispatch({
        actionType: NetworkConstants.RECIEVE_ORDER_ERROR,
        message: message
      });
    });
  },

  putOrder: (payload) => {
    ClientAPI
    .sendPostRequest('/order_requests', payload)
    .then(orderRequest => {
      AppDispatcher.dispatch({
        actionType: NetworkConstants.POST_ORDER,
        orderRequest: orderRequest
      });
    })
    .catch(message => {
      console.log(message);
    });
  }
}
