const express = require("express");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("src/tools/db.json");
const db = low(adapter);

const cors = require("cors");

const app = express();

// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "http://localhost:3000");
// });

app.use(cors());

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

// const port = 3001;
// app.listen(port, () => {
//   console.log(`JSON Server is running on port ${port}`);
// });
