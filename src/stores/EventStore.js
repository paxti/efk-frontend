'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _events = [];
let _event = {};
let _isPending = false;
let _lastRequestTime = '1970-01-01 00:00:00'

function setEvents(events, status) {
  _events = events;
  _isPending = status;
  _lastRequestTime = new Date().toGMTString();
}

function setEvent(event, status) {
  _event = event;
  _isPending = status;
}

function addParams(event) {
  event.icon = "standard:account";
  event.label = event.name + ' @ ' + event.venue;
  event.scope = "Account";
  event.value = event.sfid;
  return event;
}

class EventStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getEvents() {
    return _events;
  }

  getEventForLookup(){
    return _events.map( (event) => addParams(event) )
  }

  getEvent() {
    return _event;
  }

  isRequestPending(){
    return _isPending;
  }

  getLastRequestTime(){
    return _lastRequestTime;
  }

}

const EventStore = new EventStoreClass();

EventStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case EventConstants.SENT_EVENTS_REQUEST:
      setEvents([], action.request_status);
      EventStore.emitChange();
      break

    case EventConstants.RECIEVE_EVENTS:
      setEvents(action.events, action.request_status);
      EventStore.emitChange();
      break

    case EventConstants.RECIEVE_EVENT:
      setEvents(action.events, action.request_status);
      EventStore.emitChange();
      break

    case EventConstants.RECIEVE_EVENT_ERROR:
      setEvents(action.events, action.request_status);
      alert(action.message);
      EventStore.emitChange();
      break

    case EventConstants.RECIEVE_EVENTS_ERROR:
      setEvents(action.events, action.request_status);
      alert(action.message);
      EventStore.emitChange();
      break

    default:
  }

});

export default EventStore;
