// Reminder : unless using the esm package, node application dont know of import. Use require()

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const machineResolver = require('../server/resolvers/machine');
const itemsResolver = require('../server/resolvers/items');
const moneyResolver = require('../server/resolvers/moneyStash');

const router = express.Router();
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());// whitelists everything, so we dont have to do Acces-Control

// in package.json, nodemonConfig because nodemon restarts server whenever a file changes.
// in our case db.josn with every item update. added ignore rule in there
itemsResolver.updateItemsNr();

router.route('/machine/:id')
  .put((req, res) => itemsResolver.updateItemAmount(req,res));

router.route('/machine')
  .get((req,res) => {
    const response = machineResolver.getAll();
    return res.json(response);
  })
  .put((req, res) => {
    const response = moneyResolver.updateMoneyStash(req,res);
    return res.json(response);
  });
// .put((req, res) => {
//   const response = db.getState().moneyStash;
//   if (Object.keys(req.body).length > 0) {
//     // update || return previous value
//     response.stash = req.body.stash || response.stash;
//     response.inPurchase = req.body.inPurchase || response.inPurchase;
//     db.set('moneyStash', response).write();
//   }
//   console.log('API MONEY RESPONSE ON SERVER ', response);
//   return res.json(response);
// });

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

if (!module.parent) {
  app.listen(port);
  console.log('Express started on port ',port);
}

module.exports = router;
