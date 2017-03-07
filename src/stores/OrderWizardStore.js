'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import OrderWizardConstants from '../constants/OrderWizardConstants';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _selectedEvent = null;
let _selectedConfiguration = null;
let _rentedEntities = [];
let _orderStockAvailability = { entities: [] };
let _isStockLoading = true;
let _reservedFromInventory = [];
let _rentals = [];
let _stockItemsInCategories = [];
let _selectedFromOptions = [];
let _rentalFilter = -1;
let _categoriesForStock = [];
let _stockItemsInCategory = []
let _renatlModalState = false;
let _renatlModalObject = {};


function emptySelection(){
  _rentals.length = 0;
  _reservedFromInventory.length = 0;
}

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


function addStockItemsByCategories(stockItemsInCategories, categoryId, categoryName){

  let entry = { 'categoryId': categoryId, 'categoryName': categoryName, 'options': stockItemsInCategories };
  let index = _stockItemsInCategories.findIndex( (stockItem) => { return stockItem.categoryId == categoryId });

  if (index >= 0 ){
    _stockItemsInCategories[index] = entry;
  } else {
    _stockItemsInCategories.push( entry );
  }

}

function setNecessaryToRent(stockAvalityProblems){

  stockAvalityProblems.map( (entity) =>  {
    _rentals.push({sfid: entity.item_sfid, name: entity.item_name, amount: entity.required_amount, requiredAmount: entity.required_amount})
  })
}

function setReservedFromInventory(stockAvality){

  stockAvality.entities.filter( (item) => {
    return item.avaliable_amount >= item.required_amount
  }).map( (entity) => {
    _reservedFromInventory.push({sfid: entity.item_sfid, name: entity.item_name, amount: entity.required_amount, requiredAmount: entity.required_amount})
  })
}

function addFromOption(option){

  let index = _selectedFromOptions.findIndex( (category) => {
    return category.item.category.id == option.item.category.id;
  });


  if (index < 0) {
    _selectedFromOptions.push(option)
  } else {
    _selectedFromOptions[index] = option
  }
}

function setRentalFilter(filter){
  _rentalFilter = filter;
}

function setCategoriesForStock(categories){
  _categoriesForStock = categories;
  _categoriesForStock.unshift({name: 'All', id: -1})
}

function setStockItemsInCategory(stockItems){
  _stockItemsInCategory = stockItems;
}

function setRentalModalState(state, entity){
  _renatlModalState = state;
  _renatlModalObject = Object.assign({}, entity);
}

function updateRentalModalState(object){
  _renatlModalObject.amount = object.amount;
}

function updateReservedFromInventory(reservedObject){

  let newReservedItem = {
    sfid: reservedObject.item.sfid,
    name: reservedObject.item.name,
    amount: reservedObject.amount,
    requiredAmount: 0
  };

  let index = _reservedFromInventory.findIndex( (rentedItem) => {
    return rentedItem.sfid === reservedObject.item.sfid;
  });

  if (index < 0) {
    _reservedFromInventory.push(newReservedItem)
  } else {

    let updatedReservedObject = Object.assign({}, _reservedFromInventory[index] );
    updatedReservedObject.amount = reservedObject.amount;

    _reservedFromInventory[index] = updatedReservedObject;
  }
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

function combineBySfid(options, inventory){

  let newInventory = Object.assign([], inventory);

  options.map( (entity) => {
    let index =  newInventory.findIndex( (element) => {
      return element.sfid === entity.item.sfid
    })

    if (index > 0){
      let obj = Object.assign({}, newInventory[index]);
      obj.amount = obj.amount + entity.amount;
      newInventory[index] = obj;
    } else {
      newInventory.push({ sfid: entity.item.sfid, name: entity.item.name, amount: entity.amount });
    }
  })
  return newInventory;
}


class OrderWizardStoreClass extends EventEmitter {

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

    return _orderStockAvailability.entities.filter( (item) => {
      return item.avaliable_amount < item.required_amount && calcNecessaryToRentAmount(item) > findRentalAmount(_rentals, item)
    }).map( (entity) => {
      return Object.assign({}, entity, {need_to_be_rented: calcNecessaryToRentAmount(entity)})
    })
  }

  isStockLoading(){
    return _isStockLoading;
  }

  getRentals(){
    return _rentals;
  }

  getReservedFromInventor(){
    return _reservedFromInventory;
  }

  getStockItemsForCategory(){
    return _stockItemsInCategories;
  }

  getItemsFromOptions(){
    return _selectedFromOptions;
  }

  getItemsFromOptionsFlatten(){
    return _selectedFromOptions.map( (entity) => {
      return { sfid: entity.item.sfid, name: entity.item.name, amount: entity.amount }
    })
  }

  getRentalFilter(){
    return _rentalFilter;
  }

  getCategoriesForStock(){
    return _categoriesForStock;
  }

  getStocItemsInCategory(){
    return _stockItemsInCategory;
  }

  getRentalModalState(){
    return _renatlModalState;
  }

  getRentalModalObject(){
    return _renatlModalObject;
  }

  getAllFromInventory(){
    return combineBySfid(_selectedFromOptions, _reservedFromInventory);
  }

  getAllFromRental(){
    return Object.assign([], _rentals);
  }

  getAllEntitiesForOrder(){
    return Object.assign([],
       combineBySfid(_selectedFromOptions, _reservedFromInventory).map( (object) => Object.assign(object, { provider: 'inventory' }))
     ).concat(_rentals.map( (object) => Object.assign(object, {provider: 'rental' } )));
  }

}

const OrderWizardStore = new OrderWizardStoreClass();

OrderWizardStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case OrderWizardConstants.ORDER_Wizard_SELECT_EVENT:
      setSelectedEvent(action.selectedEvent);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_WIZARD_RECIVE_CONFIGURATION_DETAILS:
      emptySelection();
      setSelectedConfiguration(action.selectedConfiguration);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_REMOVE_SELECT_EVENT:
      setSelectedEvent(null);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_ADD_TO_RENTED:
      addToRented(action.entity, action.amount);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_REMOVE_FROM_RENTED:
      removeFreomRented(action.entity);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.RECIEVE_ORDER_PROBLEMS:
      setOrderProblems(action.stockAvailability);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_CHECK_AVAILABILITY:
      setStockLoadingStatus(action.showLoading);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_CHECK_AVAILABILITY_SUCCESS:
      setStockLoadingStatus(false);
      setOrderProblems(action.stockAvailability);
      setReservedFromInventory(action.stockAvailability);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_RENT_NECESSARY:
      setNecessaryToRent(action.stockAvalityProblems);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_CATEGORY_ALL_STOCK_ITEM:
      addStockItemsByCategories(action.categoryStockItems, action.categoryId, action.categoryName);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_SELECTED_OPTION:
      addFromOption(action.option);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_RENTAL_FILTER:
      setRentalFilter(action.filter);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_WIZARD_RECIVE_CATEGORIES_FOR_STOCK:
      setCategoriesForStock(action.categories);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_CATEGORY_STOCK_ITEM:
      setStockItemsInCategory(action.stockItems);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_RENTAL_MODAL_STATE:
      setRentalModalState(action.state, action.objectInModal);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_UPDATE_RENTAL_MODAL_STATE:
      updateRentalModalState(action.object);
      OrderWizardStore.emitChange();
      break

    case OrderWizardConstants.ORDER_Wizard_UPDATE_RESERVED_FROM_INVENTORY:
      updateReservedFromInventory(action.reservedObject);
      OrderWizardStore.emitChange();
      break

    default:
  }

});

export default OrderWizardStore;