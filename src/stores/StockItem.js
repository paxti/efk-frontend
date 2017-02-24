'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _stockItems = [];


function addStockItemInCategory(stockItems, category) {
  _categories =
}

class CategoryStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getCategories() {
    return _categories;
  }

  getStockItemsForCategory(category){
    return _categories. // where category id =  ctaegory.id
  }

  getStackItemsForAll(){
    return _categories
  }

}

const CategoryStore = new CategoryStoreClass();

CategoryStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case Constants.FETCH_CATEGORY:
      setCategories(action.category);
      CategoryStore.emitChange();
      break

    default:
  }

});

export default CategoryStore;
