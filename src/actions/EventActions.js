'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import EventConstants from '../constants/EventConstants';
import ClientAPI from '../utils/ClientAPI';

export default {

  recieveEvents: () => {

    AppDispatcher.dispatch({
      actionType: EventConstants.SENT_EVENTS_REQUEST,
      request_status: true
    })

    ClientAPI
      .sendGetRequest('/events')
      .then(events => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENTS,
          events: events,
          request_status: false
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENTS_ERROR,
          message: message,
          request_status: false
        });
      });
  },

  getEvent: (id) => {
    ClientAPI
      .sendGetRequest('/events/' + id)
      .then(event => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENT,
          event: event
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: EventConstants.RECIEVE_EVENT_ERROR,
          message: message
        });
      });
  }
}
