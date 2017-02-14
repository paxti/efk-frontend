'use strict';

import request from 'superagent/lib/client';
import LoginStore from '../stores/LoginStore'
import EventStore from '../stores/EventStore'

export default {

  getEvents: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .set('Authorization', 'Bearer ' + LoginStore.getJwt())
        .set('If-Modified-Since', EventStore.getLastRequestTime())
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },

  getEvent: (url) => {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .set('Authorization', 'Bearer ' + LoginStore.getJwt())
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  }
}
