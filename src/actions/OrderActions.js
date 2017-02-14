'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import OrderConstants from '../constants/OrderConstants';
import OrdersAPI from '../utils/OrdersAPI';

const path = "http://localhost:3000/api/v1";

export default {

  recieveOrders: () => {
    OrdersAPI
      .getOrders(path + '/order_requests')
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
    OrdersAPI
      .getOrder(path + '/order_requests/' + id)
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
