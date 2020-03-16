const express = require('express');
const bodyParse = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('src/tools/db.json');
const db = low(adapter);

const cors = require('cors');

const router = express.Router();
const app = express();

const port = process.env.PORT || 3001;

// app.use(bodyParse);
app.use(cors());

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
// });

router.route('/machine')
  .get((req,res) => {
    // const response = db.getState();
    const response = db.getState();
    return res.json(response);
  })
// router.route('/machine/:moneyStash')
  .put((req, res) => {
    const response = db.getState().moneyStash;
    if (req.body) {
      response.stash = req.body.stash;
      response.inPurchase = req.body.inPurchase;
      response.save();
    }
    return res.json(response);
  });

router.route('/machine/:id')
  .get((req,res) => {
    const response = db.getState().items.findById(req.params.id, (err, item) => {
      if (err) {
        return res.send(err);
      }
      return item;
    });
    return res.json(response);
  })
  .put((req, res) => {
    const response = db.getState().items.findById(req.params.id, (err, item) => {
      if (err) {
        return res.send(err);
      }
      item.amount = req.body.amount;
      item.itemNr = req.body.itemNr;
      item.save();
      return item;
    });
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
