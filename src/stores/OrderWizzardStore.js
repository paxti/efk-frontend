'use strict';

import _ from 'lodash'

import AppDispatcher from '../dispatchers/AppDispatcher';
import OrderWizzardConstants from '../constants/OrderWizzardConstants';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _selectedEvent = null;
let _selectedConfiguration = null;
let _rentedEntities = [];
let _orderStockAvailability = { entities: [] };
let _isStockLoading = true;
let _rentals = [];

function setSelectedEvent(event) {
  _selectedEvent = event;
}

function setSelectedConfiguration(configuration) {
  _selectedConfiguration = configuration;
}

function setOrderProblems(stockAvailability) {
  _orderStockAvailability = stockAvailability;
}

function addToRented(entity, amount){

}

function removeFreomRented(entity){

}

function setStockLoadingStatus(status){
  _isStockLoading = status;
}

function setNecessaryToRent(stockAvalityProblems){
  _.map(stockAvalityProblems, (entity) => {
    _rentals.push({sfid: entity.item_sfid, name: entity.item_name, amount: entity.required_amount})
  })
}

/**
 * Utils functions
 */

function calcNecessaryToRentAmount(entity){
  return entity.avaliable_amount > 0 ? entity.required_amount - entity.avaliable_amount :  entity.required_amount
}

function findRentalAmount(rentals, entity){

  let matchingRentalAmount = 0;

  rentals.forEach( (renatalItem) => {
    if (renatalItem.sfid === entity.item_sfid) {
      matchingRentalAmount =  renatalItem.amount
    }
  });

   return matchingRentalAmount;
}


class OrderWizzardStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getSelectedEvent() {
    return _selectedEvent;
  }

  getSelectedConfiguration() {
    return _selectedConfiguration;
  }

  getRentedEntities() {
    return _rentedEntities;
  }

  getStockAvailability(){
    return _orderStockAvailability;
  }

  getStockAvailabilityProblems(){
    return _.compact(_.map(_.filter(_orderStockAvailability.entities, (item) => { return item.avaliable_amount < item.required_amount }), (entity) => {
      if (calcNecessaryToRentAmount(entity) > findRentalAmount(_rentals, entity)) {
        return _.assign(entity, {need_to_be_rented: calcNecessaryToRentAmount(entity)})
      }
    }));
  }

  isStockLoading(){
    return _isStockLoading;
  }

  getRentals(){
    return _rentals;
  }

  removeAllRentails(){
    _rentals = [];
  }

}

const OrderWizzardStore = new OrderWizzardStoreClass();

OrderWizzardStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case OrderWizzardConstants.ORDER_WIZZARD_SELECT_EVENT:
      setSelectedEvent(action.selectedEvent);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZARD_RECIVE_CONFIGURATION_DETAILS:
      setSelectedConfiguration(action.selectedConfiguration);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZZARD_REMOVE_SELECT_EVENT:
      setSelectedEvent(null);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZZARD_ADD_TO_RENTED:
      addToRented(action.entity, action.amount);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZZARD_REMOVE_FROM_RENTED:
      removeFreomRented(action.entity);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.RECIEVE_ORDER_PROBLEMS:
      setOrderProblems(action.stockAvailability);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZZARD_CHECK_AVAILABILITY:
      setStockLoadingStatus(action.showLoading);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZZARD_CHECK_AVAILABILITY_SUCCESS:
      setStockLoadingStatus(false);
      setOrderProblems(action.stockAvailability);
      OrderWizzardStore.emitChange();
      break

    case OrderWizzardConstants.ORDER_WIZZARD_RENT_NECESSARY:
      setNecessaryToRent(action.stockAvalityProblems);
      OrderWizzardStore.emitChange();
      break

    default:
  }

});

export default OrderWizzardStore;
