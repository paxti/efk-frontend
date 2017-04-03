'use strict';

import AppDispatcher from '../dispatchers/AppDispatcher';
import { NetworkConstants } from '../constants/Constants';
import ClientAPI from '../utils/ClientAPI';

export default {

  recieveEvents: () => {

    AppDispatcher.dispatch({
      actionType: NetworkConstants.SENT_EVENTS_REQUEST,
      request_status: true
    })

    ClientAPI
      .sendGetRequest('/events')
      .then(events => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_EVENTS,
          events: events,
          request_status: false
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_EVENTS_ERROR,
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
          actionType: NetworkConstants.RECIEVE_EVENT,
          event: event
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: NetworkConstants.RECIEVE_EVENT_DETAILS_ERROR,
          message: message
        });
      });
  }
}
