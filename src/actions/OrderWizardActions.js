'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import Constants from '../constants/Constants'
import OrderWizardConstants from '../constants/OrderWizardConstants'
import ClientAPI from '../utils/ClientAPI';

const Actions = {

  setEvent: (selectedEvent) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_SELECT_EVENT,
      selectedEvent: selectedEvent
    });
  },

  fetchCategoriesForStock: () => {
    ClientAPI
      .sendGetRequest('/stock_items/categories/')
      .then(categories => {
        AppDispatcher.dispatch({
          actionType: OrderWizardConstants.ORDER_WIZARD_RECIVE_CATEGORIES_FOR_STOCK,
          categories: categories
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATION_ERROR,
          message: message
        });
      });
  },

  setConfiguration: (selectedConfiguration, selectedEvent) => {
    ClientAPI
      .sendGetRequest('/configurations/' + selectedConfiguration.id)
      .then(configuration => {
        AppDispatcher.dispatch({
          actionType: OrderWizardConstants.ORDER_WIZARD_RECIVE_CONFIGURATION_DETAILS,
          selectedConfiguration: configuration
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATION_ERROR,
          message: message
        });
      });
  },

  fetchStockItemForCategory: (id) => {
    /**
     * if id < 0 request all
     */
    let filter = id > 0 ? {category_id: id} : {}
    ClientAPI
      .sendGetRequest('/stock_items/', filter)
      .then(stockItems => {
        AppDispatcher.dispatch({
          actionType: OrderWizardConstants.ORDER_Wizard_CATEGORY_STOCK_ITEM,
          stockItems: stockItems,

        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.RECIEVE_CONFIGURATION_ERROR,
          message: message
        });
      });
  },

  fetchAllStockItemForCategory: (entities) => {
    entities.map( (entity) => {
      ClientAPI
        .sendGetRequest('/stock_items/', {category_id: entity.category.id})
        .then(categoryStockItems => {
          AppDispatcher.dispatch({
            actionType: OrderWizardConstants.ORDER_Wizard_CATEGORY_ALL_STOCK_ITEM,
            categoryStockItems: categoryStockItems,
            categoryId: entity.category.id,
            categoryName: entity.category.name
          });
        })
        .catch(message => {
          AppDispatcher.dispatch({
            actionType: Constants.RECIEVE_CONFIGURATION_ERROR,
            message: message
          });
        });
    })
  },

  checkAvailability: (configuration, selectedEvent) => {

    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_CHECK_AVAILABILITY,
      show_loading: true
    });

    ClientAPI
      .sendGetRequest('/boms/' + configuration.bom.id + '/stock?event_id=' + selectedEvent.id)
      .then(stockAvailability => {
        AppDispatcher.dispatch({
          actionType: OrderWizardConstants.ORDER_Wizard_CHECK_AVAILABILITY_SUCCESS,
          stockAvailability: stockAvailability
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: Constants.ORDER_Wizard_CHECK_AVAILABILITY_ERROR,
          message: message
        });
      });
  },

  addItemFromOptions: (option) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_SELECTED_OPTION,
      option: option
    });
  },

  rentNecessary: (stockAvalityProblems) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_RENT_NECESSARY,
      stockAvalityProblems: stockAvalityProblems
    });
  },

  setRentalFilter: (rentalFilter) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_RENTAL_FILTER,
      filter: rentalFilter
    });
  },

  setRentalModelState: (state, entity = {}) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_RENTAL_MODAL_STATE,
      state: state,
      objectInModal: entity
    });
  },

  updateCurrentRentalModalObject: (object) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_UPDATE_RENTAL_MODAL_STATE,
      object: object
    });
  },

  updateReservedFromInventory: (reservedObject) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_UPDATE_RESERVED_FROM_INVENTORY,
      reservedObject: reservedObject
    });
  },

  removeEvent: () => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ORDER_Wizard_REMOVE_SELECT_EVENT
    });
  }
};

export default Actions;