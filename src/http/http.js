//toate endpoints

export const SERVER_URL = "http://localhost:3001/";

// toate metodele http : get, post, put, delete => toate pe baza de fetch
export const get = (url, config = {}) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000"
    },
    ...config
  })
    .then(resp => {
      console.log("RESP", resp);
      console.log("URL", url);
      return resp.json();
    })
    .catch(err => console.log(err));

export const put = (url, data, config = {}) =>
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      charset: "UTF-8"
    },
    body: JSON.stringify(data),
    ...config
  }).then(resp => {
    return resp.json();
  });
