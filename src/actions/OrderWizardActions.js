'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher.js';
import Constants from '../constants/Constants'
import { NetworkConstants, OrderWizardConstants } from '../constants/Constants'
import ClientAPI from '../utils/ClientAPI';

const Actions = {

  setEvent: (selectedEvent) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.SET_EVENT,
      selectedEvent: selectedEvent
    });
  },

  setSelectedConfiguration: (selectedConfiguration) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.SET_CONFIGURATION,
      selectedConfiguration: selectedConfiguration
    });
  },

  setSelectedGraphicsSet: (graphicsSets) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.SET_GRAPHICS_SET,
      selectedGraphicsSet: graphicsSets
    });
  },

  fetchCategoriesForStock: () => {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECEIVE_CATEGORIES_FOR_STOCK,
      isLoading: true
    });

    ClientAPI
      .sendGetRequest('/stock_items/categories/')
      .then(categories => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECEIVE_CATEGORIES_FOR_STOCK_SUCCESS,
          categories: categories
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECEIVE_CATEGORIES_FOR_STOCK_ERROR,
          message: message
        });
      });
  },

  /**
   * [setConfiguration description]
   * @param {[type]} selectedConfiguration [description]
   * @param {[type]} selectedEvent         [description]
   */
  fetchConfigurationDetailsOnly: (selectedConfiguration) => {

    console.log(selectedConfiguration);

    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS,
      show_loading: true
    });

    ClientAPI
      .sendGetRequest('/configurations/' + selectedConfiguration.id)
      .then(configuration => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_SUCCESS,
          configurationDetails: configuration
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_ERROR,
          message: message
        });
      });
  },

  /**
   * [setConfiguration description]
   * @param {[type]} selectedConfiguration [description]
   * @param {[type]} selectedEvent         [description]
   */
  fetchConfigurationDetails: (selectedConfiguration) => {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS,
      show_loading: true
    });

    ClientAPI
      .sendGetRequest('/configurations/' + selectedConfiguration.id)
      .then(configuration => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_SUCCESS,
          configurationDetails: configuration
        });



        configuration.category_set.category_entities.map( (entity) => {
          ClientAPI
            .sendGetRequest('/stock_items/', {category_id: entity.category.id})
            .then(categoryStockItems => {
              AppDispatcher.dispatch({
                actionType: OrderWizardConstants.ADD_ALL_STOCK_ITEM_BY_CATEGORY,
                categoryStockItems: categoryStockItems,
                categoryId: entity.category.id,
                categoryName: entity.category.name
              });
            })
            .catch(message => {
              AppDispatcher.dispatch({
                actionType: NetworkConstants.RECEIVE_STOCK_ITEMS_FOR_CATEGORY_ERROR,
                message: message
              });
            });
        })

      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_ERROR,
          message: message
        });
      });
  },

  /**
   * [fetchStockItemForCategory description]
   * @param  {[type]} id [Category id. If id < 0 will return all stock_items]
   * @return {[type]}    [description]
   */
  fetchStockItemForCategory: (id) => {
    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECEIVE_STOCK_ITEMS_FOR_CATEGORY,
      isLoading: true
    });

    let filter = id > 0 ? {category_id: id} : {}
    ClientAPI
      .sendGetRequest('/stock_items/', filter)
      .then(stockItems => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECEIVE_STOCK_ITEMS_FOR_CATEGORY_SUCCESS,
          stockItems: stockItems
        });
    })
    .catch(message => {
      AppDispatcher.dispatch({
        actionType: NetworkConstants.RECEIVE_STOCK_ITEMS_FOR_CATEGORY_ERROR,
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
            actionType: OrderWizardConstants.ADD_ALL_STOCK_ITEM_BY_CATEGORY,
            categoryStockItems: categoryStockItems,
            categoryId: entity.category.id,
            categoryName: entity.category.name
          });
        })
        .catch(message => {
          AppDispatcher.dispatch({
            actionType: NetworkConstants.RECEIVE_STOCK_ITEMS_FOR_CATEGORY_ERROR,
            message: message
          });
        });
    })
  },

  /**
   * [checkAvailability description]
   * @param  {[type]} configuration [description]
   * @param  {[type]} selectedEvent [description]
   * @return {[type]}               [description]
   */
  checkAvailability: (selectedConfiguration, selectedEvent) => {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.RECEIVE_STOCK_AVAILABILITY,
      show_loading: true
    });

    ClientAPI
      .sendGetRequest('/boms/' + selectedConfiguration.bom.id + '/stock?event_id=' + selectedEvent.id)
      .then(stockAvailability => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECEIVE_STOCK_AVAILABILITY_SUCCESS,
          stockAvailability: stockAvailability
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECEIVE_STOCK_AVAILABILITY_ERROR,
          message: message
        });
      });
  },

  addItemFromOptions: (option) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ADD_SELECTED_OPTION_FROM_OPTIONS,
      option: option
    });
  },

  rentNecessary: (stockAvalityProblems) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ADD_NECESSARY_TO_RENTED,
      stockAvalityProblems: stockAvalityProblems
    });
  },

  setRentalFilter: (rentalFilter) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.SET_RENTAL_FILTER,
      filter: rentalFilter
    });
  },

  setReviewFilter: (filter) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.SET_REVIEW_FILTER,
      filter: filter
    });
  },

  setRentalModelState: (state, entity = {}) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.SHOW_RENTAL_MODAL,
      state: state,
      objectInModal: entity
    });
  },

  updateCurrentRentalModalObject: (object) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.UPDATE_RENTAL_MODAL,
      object: object
    });
  },

  updateRental: () => {
    AppDispatcher.dispatch({
        actionType: OrderWizardConstants.UPDATE_RENTALS_FROM_MODAL
    })
  },

  updateReservedFromInventory: (reservedObject) => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.ADD_TO_RESERVED_FOR_INVENTORY,
      reservedObject: reservedObject
    });
  },

  removeEvent: () => {
    AppDispatcher.dispatch({
      actionType: OrderWizardConstants.REMOVE_SELECTED_EVENT
    });
  }
};

export default Actions;
