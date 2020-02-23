import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:3001/machine";

export function updateMoney(money) {
  return (
    console.log("HTTPPUT", money, JSON.stringify(money)) ||
    fetch(baseUrl + (money.stash || ""), {
      method: "PUT", // POST for create, PUT to update.
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        charset: "UTF-8"
      },
      body: JSON.stringify({
        ...money
      })
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
