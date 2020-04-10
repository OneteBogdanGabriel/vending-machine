import { handleResponse, handleError } from './apiUtils';

const baseUrl = 'http://localhost:3001/machine/';

export function updateMoney(moneyStash) {
  // console.log('HTTPPUT', moneyStash, JSON.stringify(moneyStash));
  return (
    // || fetch(baseUrl + (money.stash || ''), {
    fetch(baseUrl, {
      method: 'PUT', // POST for create, PUT to update.
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        charset: 'UTF-8',
      },
      body: JSON.stringify({
        ...moneyStash,
      }),
    })
      .then(handleResponse)
      .catch(handleError)
  );
}

// export function getMoney() {
//   return fetch(baseUrl)
//     .then(handleResponse)
//     .catch(handleError);
// }

export function getMoney() {
  console.log('FETCH', fetch(baseUrl));
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
