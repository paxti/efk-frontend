'use strict';

import request from 'superagent/lib/client';
import LoginStore from '../stores/LoginStore'

export default {

  getInventory: (url) => {
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
