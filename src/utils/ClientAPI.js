'use strict';

import request from 'superagent/lib/client';
import LoginStore from '../stores/LoginStore'

const basePath = 'http://localhost:3000/api/v1';

export default {

  sendGetRequest: (url, query = {}) => {
    return new Promise((resolve, reject) => {
      request
        .get(basePath + url)
        .query(query)
        .set('Authorization', 'Bearer ' + LoginStore.getJwt())
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  },

  sendPostRequest: (url, payload) => {
    return new Promise((resolve, reject) => {
      request
        .post(basePath + url)
        .send(payload)
        .set('Authorization', 'Bearer ' + LoginStore.getJwt())
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        })
    });
  }

}
