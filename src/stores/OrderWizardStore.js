'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants, OrderWizardConstants } from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _inventoryRequestStatus = true;
let _categoriesRequestStatus = true;

let _selectedEvent = null;
let _selectedConfiguration = null;
let _graphicsSets = [];
let _graphicsSet = {};
let _rentedEntities = [];
let _orderStockAvailability = { entities: [] };
let _isStockLoading = true;
let _reservedFromInventory = [];
let _rentals = [];
let _stockItemsInCategories = [];
let _selectedFromOptions = [];
let _rentalFilter = -1;
let _reviewFilter = -1;
let _categoriesForStock = [];
let _stockItemsInCategory = []
let _renatlModalState = false;
let _renatlModalObject = {item: {}};
let _newOrderReviewFiltredData = [];


function setInventoryRequestStatus(requestStatus){
  _inventoryRequestStatus = requestStatus;
}

function setCategoriesRequestStatus(requestStatus){
  _categoriesRequestStatus = requestStatus;
}

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

function setGraphicsSets(graphicsSets) {
  _graphicsSets = graphicsSets;
}

function setSelectedGraphicsSet(selectedGraphicsSet) {
  _graphicsSet = selectedGraphicsSet;
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
    _rentals.push(buildInventoryItem(entity))
  })
}

function setReservedFromInventory(stockAvality){

  stockAvality.entities.filter( (item) => {
    return item.avaliable_amount >= item.required_amount
  }).map( (entity) => {
    if (findIndexBySfid(_reservedFromInventory, entity.item_sfid) < 0) {
      _reservedFromInventory.push(buildInventoryItem(entity))
    }
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

function setReviewFilter(filter){
  _reviewFilter = filter;
}

function setNewOrderReviewFiltredData(filter) {

  let data = combineForNewOrder(_selectedFromOptions, _reservedFromInventory, _rentals);

  if (filter == -1) {
    _newOrderReviewFiltredData = data;
  } else {
    _newOrderReviewFiltredData = data.filter( (object) => {
      return object.provider === filter;
    })
  }
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

function updateRentalModalState(entity){
  _renatlModalObject = Object.assign({}, entity);
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

function updateRentalsFromModal(){

  let index = findIndexBySfid(_reservedFromInventory, _renatlModalObject.item.sfid);
  if (index > 0 ) {

    if (_renatlModalObject.rented == 0){
      _reservedFromInventory.splice(index, 1)
    } else {
      _reservedFromInventory[index].amount = _renatlModalObject.rented
    }

  } else {

    // TODO: Should be new factory
    let newRenal = {
      amount: _renatlModalObject.rented,
      name: _renatlModalObject.item.name,
      provider: 'inventory',
      required_amount: 0,
      sfid: _renatlModalObject.item.sfid
    }

    _reservedFromInventory.push(newRenal);

  }

  //TODO: function to set null
  _renatlModalObject = { item: {} };
  _renatlModalState = false;
}


/**
 * Utils functions
 */

function buildInventoryItem(entity){
  return {
    sfid: entity.item_sfid,
    name: entity.item_name,
    amount: entity.required_amount,
    requiredAmount: entity.required_amount
  }
}

function calcNecessaryToRentAmount(entity){
  return entity.avaliable_amount > 0 ? entity.required_amount - entity.avaliable_amount :  entity.required_amount;
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

function findIndexBySfid(allReserved, sfid) {
  return allReserved.findIndex( (reservedObject) => {
     return reservedObject.sfid === sfid
  });
}

function findReservedForItem(allReserved, item) {
  let indexOfReserved = findIndexBySfid(allReserved, item.sfid);
  return indexOfReserved < 0 ? 0 : allReserved[indexOfReserved].amount;
}

function combineForNewOrder(options, inventory, rentals) {
  return Object.assign([],
     combineBySfid(options, inventory)
      .map( (object) => Object.assign(object, { provider: 'inventory' }))
   ).concat(rentals.map( (object) => Object.assign(object, {provider: 'rental' } )));
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

  /**
   *
   */
  getInventoryRequestStatus() {
    return _inventoryRequestStatus;
  }

  getCategoriesRequestStatus() {
    return _categoriesRequestStatus;
  }

  getSelectedEvent() {
    return _selectedEvent;
  }

  getSelectedConfiguration() {
    return _selectedConfiguration;
  }

  getGraphicsSets() {
    return _graphicsSets;
  }

  getSelectedGraphicsSet(){
    return _graphicsSet;
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

  getReviewFilter(){
    return _reviewFilter;
  }

  getNewOrderReviewFilteredData() {

    let data = combineForNewOrder(_selectedFromOptions, _reservedFromInventory, _rentals);

    if (_reviewFilter == -1) {
      return data;
    } else {
      return data.filter( (object) => {
        return object.provider === _reviewFilter;
      })
    }
  }

  getCategoriesForStock(){
    return _categoriesForStock;
  }

  getStockItemsInCategory(){
    return _stockItemsInCategory;
  }

  getStockItemsInCategoryWithReserved() {
    return _stockItemsInCategory.map( (stockItem, index) => Object.assign(
      {},
      stockItem,
      { rented: findReservedForItem(_reservedFromInventory, stockItem.item) }
    ))
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
    return combineForNewOrder(_selectedFromOptions, _reservedFromInventory, _rentals);
  }
}

const OrderWizardStore = new OrderWizardStoreClass();

OrderWizardStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case OrderWizardConstants.SET_EVENT:
      setSelectedEvent(action.selectedEvent);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.SET_CONFIGURATION:
      setSelectedConfiguration(action.selectedConfiguration);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.SET_GRAPHICS_SET:
      setSelectedGraphicsSet(action.selectedGraphicsSet);
      OrderWizardStore.emitChange();
      break;

    case NetworkConstants.RECIEVE_CONFIGURATION_DETAILS:
      OrderWizardStore.emitChange();
      break;

    case NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_SUCCESS:
      setSelectedConfiguration(action.configurationDetails);
      setGraphicsSets(action.configurationDetails.graphics_sets);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.REMOVE_SELECTED_EVENT:
      setSelectedEvent(null);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.ADD_TO_RENATAL:
      addToRented(action.entity, action.amount);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.REMOVE_FROM_RENTAL:
      removeFreomRented(action.entity);
      OrderWizardStore.emitChange();
      break;

    case NetworkConstants.RECIEVE_ORDER_PROBLEMS:
      setOrderProblems(action.stockAvailability);
      OrderWizardStore.emitChange();
      break;

    case NetworkConstants.RECEIVE_STOCK_AVAILABILITY:
      setStockLoadingStatus(action.showLoading);
      OrderWizardStore.emitChange();
      break;

    case NetworkConstants.RECEIVE_STOCK_AVAILABILITY_SUCCESS:
      setStockLoadingStatus(false);
      setOrderProblems(action.stockAvailability);
      setReservedFromInventory(action.stockAvailability);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.ADD_NECESSARY_TO_RENTED:
      setNecessaryToRent(action.stockAvalityProblems);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.ADD_ALL_STOCK_ITEM_BY_CATEGORY:
      addStockItemsByCategories(action.categoryStockItems, action.categoryId, action.categoryName);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.ADD_SELECTED_OPTION_FROM_OPTIONS:
      addFromOption(action.option);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.SET_RENTAL_FILTER:
      setRentalFilter(action.filter);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.SET_REVIEW_FILTER:
      setReviewFilter(action.filter);
      OrderWizardStore.emitChange();
      break;

    /**
     * Categories for stock
     */
    case NetworkConstants.RECEIVE_CATEGORIES_FOR_STOCK:
      setCategoriesRequestStatus(action.isLoading);
      OrderWizardStore.emitChange();
      break;

    case NetworkConstants.RECEIVE_CATEGORIES_FOR_STOCK_SUCCESS:
      setCategoriesForStock(action.categories);
      setCategoriesRequestStatus(false);
      OrderWizardStore.emitChange();
      break;

      /**
       * CInventory
       */
    case NetworkConstants.RECEIVE_STOCK_ITEMS_FOR_CATEGORY_SUCCESS:
      setStockItemsInCategory(action.stockItems);
      setInventoryRequestStatus(false);
      OrderWizardStore.emitChange();
      break;

    case NetworkConstants.RECEIVE_STOCK_ITEMS_FOR_CATEGORY:
      setInventoryRequestStatus(action.isLoading);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.SHOW_RENTAL_MODAL:
      setRentalModalState(action.state, action.objectInModal);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.UPDATE_RENTAL_MODAL:
      updateRentalModalState(action.object);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.ADD_TO_RESERVED_FOR_INVENTORY:
      updateReservedFromInventory(action.reservedObject);
      OrderWizardStore.emitChange();
      break;

    case OrderWizardConstants.UPDATE_RENTALS_FROM_MODAL:
      updateRentalsFromModal();
      OrderWizardStore.emitChange();
      break;

    default:
  }

});

export default OrderWizardStore;
