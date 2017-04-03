'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants } from '../constants/Constants';
import ClientAPI from '../utils/ClientAPI';

export default {

  fetchStockItems: () => {
    ClientAPI
      .sendGetRequest('/stock_items')
      .then(stockItems => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_STOCK_ITEMS,
          stockItems: stockItems
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATIONS_ERROR,
          message: message,
          request_status: false
        });
      });
  }
}
