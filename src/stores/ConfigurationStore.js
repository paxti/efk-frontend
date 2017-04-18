'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants } from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _configurations = [];
let _configuration = {};
let _configurationsRequestStatus = true;

function setConfigurations(configurations) {
  _configurations = configurations;
}

function setConfiguration(configuration) {
  _configuration = configuration;
}

function setConfigurationsRequestStatus(requestStatus){
  _configurationsRequestStatus = requestStatus;
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

  getConfigurationsRequestStatus(){
    return _configurationsRequestStatus;
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
    case NetworkConstants.RECIEVE_CONFIGURATIONS:
      setConfigurationsRequestStatus(action.isLoading);
      ConfigurationStore.emitChange();
      break

    case NetworkConstants.RECIEVE_CONFIGURATIONS_SUCCESS:
      setConfigurationsRequestStatus(false);
      setConfigurations(action.configurations);
      ConfigurationStore.emitChange();
      break

    case NetworkConstants.RECIEVE_CONFIGURATIONS_ERROR:
      setConfigurationsRequestStatus(false);
      ConfigurationStore.emitChange();
      console.log(action);
      break

    case NetworkConstants.RECIEVE_CONFIGURATION_DETAILS_ERROR:
      console.log(action);
      ConfigurationStore.emitChange();
      break

    default:
  }

});

export default ConfigurationStore;
