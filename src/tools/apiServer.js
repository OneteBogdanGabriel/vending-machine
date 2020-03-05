const express = require('express');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('src/tools/db.json');
const db = low(adapter);

const cors = require('cors');

const app = express();

const port = process.env.PORT || 3001;

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
// });

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/machine', (req, res) => {
  const dbState = db.getState();
  res.send(dbState);
});

// if (!module.parent) {
//   app.listen(port);
//   console.log('Express started on port ',port);
// }

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
