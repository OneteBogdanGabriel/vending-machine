import { handleResponse, handleError } from "./apiUtils";
// import { MACHINE_URL } from "../http/http";
// const baseUrl = MACHINE_URL;
// import { SERVER_URL } from "../http/http";
// const baseUrl = SERVER_URL + "/machine";
const baseUrl = "http://localhost:3001/machine";
// const baseUrl = process.env.API_URL + "/machine";

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

export function getMoney() {
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
