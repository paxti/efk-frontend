'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _configurations = [];
let _configuration = {};

function setConfigurations(configurations) {
  _configurations = configurations;
}

function setConfiguration(configuration) {
  _configuration = configuration;
}

class ConfigurationStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getConfigurations() {
    return _configurations;
  }

  getConfigurationDetails() {
    return _configuration;
  }

}

const ConfigurationStore = new ConfigurationStoreClass();

ConfigurationStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case Constants.RECIEVE_CONFIGURATIONS:
      setConfigurations(action.configurations);
      ConfigurationStore.emitChange();
      break

    case Constants.RECIEVE_CONFIGURATION_DETAILS:
      setConfiguration(action.configuration);
      ConfigurationStore.emitChange();
      break

    case Constants.RECIEVE_CONFIGURATIONS_ERROR:
      alert(action.message);
      ConfigurationStore.emitChange();
      break

    case Constants.RECIEVE_CONFIGURATION_ERROR:
      alert(action.message);
      ConfigurationStore.emitChange();
      break

    default:
  }

});

export default ConfigurationStore;
