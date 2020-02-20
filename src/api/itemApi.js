import { handleResponse, handleError } from "./apiUtils";
// import { MACHINE_URL } from "../http/http";
// const baseUrl = MACHINE_URL;
// import { SERVER_URL } from "../http/http";
// const baseUrl = SERVER_URL + "/machine";

const baseUrl = "http://localhost:3001/machine";
// console.log("API URL HERE", process.env.API_URL);
export function updateItem(item) {
  return (
    console.log("HTTPPUT", item, JSON.stringify(item)) ||
    fetch(baseUrl + (item.id || ""), {
      method: "PUT", // POST for create, PUT to update.
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        charset: "UTF-8"
      },
      body: JSON.stringify({
        ...item
      })
    })
      .then(handleResponse)
      .catch(handleError)
  );
}

export function getItems() {
  console.log("FETCH", fetch(baseUrl));
  return fetch(baseUrl, {
    method: "GET", // POST for create, PUT to update.
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      charset: "UTF-8"
    }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function getItem() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
