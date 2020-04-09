// Reminder : unless using the esm package, node application dont know of import. Use require()

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const path = require('path');
const fs = require('fs');

const machineResolver = require('../server/resolvers/machine');
const itemsResolver = require('../server/resolvers/items');
const moneyResolver = require('../server/resolvers/moneyStash');

const router = express.Router();
const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());// whitelists everything, so we dont have to do Acces-Control
app.use(express.static(path.join(__dirname, 'public')));// for background images


// in package.json, nodemonConfig because nodemon restarts server whenever a file changes.
// in our case db.josn with every item update. added ignore rule in there
itemsResolver.updateItemsNr();


// router.route('/machine/images')
//   .get((req, res) => {
//     const fileToLoad = fs.readFileSync(file);
//     res.writeHead(200, { 'Content-Type': 'image/jpg' });
//     res.end(fileToLoad, 'binary');
//     return res;
//   });

router.route('/machine/:id')
  .get((req, res) => {
    const response = itemsResolver.updateItemAmount(req.body).items; // .items because we may receive the entire db
    return res.json(response);
  });

router.route('/machine')
  .get((req,res) => {
    const response = machineResolver.getAll();
    return res.json(response);
  })
  .put((req, res) => {
    const response = moneyResolver.updateMoneyStash(req.body);
    return res.json(response);
  });

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World');
});

if (!module.parent) {
  app.listen(port);
  console.log('Express started on port ',port);
}

module.exports = router;
