
const jsonServer = require("json-server");
const server = jsonServer.create();
const path = require("path");
const router = jsonServer.router(path.join(__dirname, "db.json"));


const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser. Using JSON Server's bodyParser
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
    req.body.slug = createSlug(req.body.name);
    next();
  }
});

server.get("/machine", function(req, res, next) {
  const error = validateItems(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    req.body.slug = createSlug(req.body.name);
    next();
  }
});

// Use default router
server.use(router);

// Start server
const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Centralized logic

// Returns a URL friendly slug
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

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