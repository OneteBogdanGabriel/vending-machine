const express = require('express');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('src/tools/db.json');
const db = low(adapter);

const cors = require('cors');

const itemRouter = express.Router();
const app = express();

const port = process.env.PORT || 3001;

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
// });

app.use(cors());

itemRouter.route('/machine')
  .get((req,res) => {
    const response = db.getState();
    // const response = db.getState().items;
    // const response = { hello: 'hello all' };
    res.json(response);
  });
itemRouter.route('/machine/:id')
  .get((req,res) => {
    const response = db.getState();
    res.json(response);
  });
app.use(itemRouter);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/machine', (req, res) => {
  const dbState = db.getState();
  res.send(dbState);
});

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// if (!module.parent) {
//   app.listen(port);
//   console.log('Express started on port ',port);
// }
