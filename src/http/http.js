// toate endpoints

export const SERVER_URL = 'http://localhost:3001/';

// toate metodele http : get, post, put, delete => toate pe baza de fetch
export const get = (url, config = {}) => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  ...config,
})
  .then((resp) => resp.json())
  .catch((err) => console.log(err));

export const put = (url, data, config = {}) => fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    charset: 'UTF-8',
  },
  body: JSON.stringify(data),
  ...config,
}).then((resp) => resp.json());
