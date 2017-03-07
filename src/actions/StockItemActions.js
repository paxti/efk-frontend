'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import ClientAPI from '../utils/ClientAPI';

export default {

  fetchStockItems: () => {
    ClientAPI
      .sendGetRequest('/stock_items')
      .then(stockItems => {
        AppDispatcher.dispatch({
          actionType: Constants.STOCK_ITEMS_FETCH,
          stockItems: stockItems
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATIONS_ERROR,
          message: message,
          request_status: false
        });
      });
  }
}
