
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));
// console.log("ROUTER",router);

console.log("JSON SERVER",jsonServer);

const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH
server.use(jsonServer.bodyParser);

// Simulate delay on all requests
server.use(function(req, res, next) {
  setTimeout(next, 2500);
});


server.put("/machine", function(req, res, next) {
  const error = validateItem(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    return res.status(200);
    // next();
  }
});

server.get("/machine", function(req, res, next) {
  const error_items = validateItems(req.body);
  const error_money = validateMoneyStash(req.body);
  if (error_items) {
    res.status(400).send(error_items);
  } else if (error_money) {
    res.status(400).send(error_money);
  } else {
    res.status(200).send(req.body);
    next();
  }
});

server.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

function validateItem(item) {
  if (!item.name) return "Name is required.";
  if (!item.price) return "Price is required.";
  if (!item.amount) return "Amount is required.";
  return "";
}

function validateItems(items) {
  if (items.length === 0) return "List of items is empty.";
  return "";
}

function validateMoneyStash(moneyStash) {
  if (moneyStash === {}) return "List of items is empty.";
  return "";
}