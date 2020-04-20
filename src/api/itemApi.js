import { handleResponse, handleError } from './apiUtils';

const fetch = require('node-fetch');

const baseUrl = 'http://localhost:3001/machine/';

export function updateItem(item) {
  // console.log('HTTPPUT', JSON.stringify(item));
  return (
    fetch(baseUrl + (item.id || ''), {
      method: 'PUT', // POST for create, PUT to update.
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        charset: 'UTF-8',
      },
      body: JSON.stringify({
        ...item,
      }),
    })
      .then(handleResponse)
      .catch(handleError)
  );
}

export function getItems() {
  return fetch(baseUrl, {
    method: 'GET', // POST for create, PUT to update.
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      charset: 'UTF-8',
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

// export function getItem() {
//   return fetch(baseUrl)
//     .then(handleResponse)
//     .catch(handleError);
// }
