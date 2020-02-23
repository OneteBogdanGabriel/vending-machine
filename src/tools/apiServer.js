// const express = require("express");
// const server = express();
// const bodyParser = require("body-parser");

// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");

// const adapter = new FileSync("src/tools/db.json");
// const db = low(adapter);

// server.use(bodyParser);

// // Simulate delay on all requests
// // server.use(function(req, res, next) {
// //   setTimeout(next, 2000);
// // });

// server.get("/machine", function(req, res) {
//   const dbState = db.getState();
//   // console.log("DB STATE", dbState);
//   // return res.status(200).send(dbState);
//   res.send(dbState);
//   next();
// });

// server.get("/", function(req, res) {
//   console.log("Whatevs");
// });

// const port = 3001;
// server.listen(port, () => {
//   console.log(`JSON Server is running on port ${port}`);
// });

var express = require("express");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("src/tools/db.json");
const db = low(adapter);

var app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
});

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/machine", function(req, res) {
  const dbState = db.getState();
  res.send(dbState);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3001);
  console.log("Express started on port 3001");
}
