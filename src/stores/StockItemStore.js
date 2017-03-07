'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _stockItems = [];

function setStockItems(stockItems) {
  _stockItems = stockItems;
}

class StockItemStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getStockItems() {
    return _stockItems;
  }

}

const StockItemStore = new StockItemStoreClass();

StockItemStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case Constants.STOCK_ITEMS_FETCH:
      setStockItems(action.stockItems);
      StockItemStore.emitChange();
      break

    default:
  }

});

export default StockItemStore;
