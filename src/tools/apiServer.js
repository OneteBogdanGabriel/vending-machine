const express = require('express');
const bodyParser = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('src/tools/db.json');
const db = low(adapter);

const cors = require('cors');

const router = express.Router();
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());// whitelists everything, so we dont have to do Acces-Control

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
// });

router.route('/machine/:id')
  .put((req, res) => {
    // console.log('xxx req.params', req.body, res.body, req.params);
    // check lowdb doc for commands
    const response = db.update(
      'items',
      (items) => items.map((item) => ({
        ...item,
        ...(req.params.id === item.id ? { amount: req.body.amount, itemNr: req.body.itemNr } : {}),
      })),
    ).write();
    return res.json(response);
  });


router.route('/machine')
  .get((req,res) => {
    const response = db.getState();
    return res.json(response);
  })
  .put((req, res) => {
    const response = db.getState().moneyStash;
    if (Object.keys(req.body).length > 0) {
      // update || return previous value
      response.stash = req.body.stash || response.stash;
      response.inPurchase = req.body.inPurchase || response.inPurchase;
      db.set('moneyStash', response).write();
    }
    return res.json(response);
  });

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/machine', (req, res) => {
//   const dbState = db.getState().items;
//   res.send(dbState);
// });

// app.listen(port, () => {
//   console.log(`JSON Server is running on port ${port}`);
// });

if (!module.parent) {
  app.listen(port);
  console.log('Express started on port ',port);
}

module.exports = router;
