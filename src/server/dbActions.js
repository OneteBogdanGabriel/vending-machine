const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('src/tools/db.json');

const db = low(adapter);

const dbState = db.getState();
// const resolverItemsFunc = require('../resolvers/items');

export function getAll() {
  return dbState;
}

export function getField(fieldName) {
  return dbState[fieldName];
}
// replace object entirely
export function setField(fieldName, data) {
  return db.set(fieldName, data).write();
}
// update element of object
export function updateField(fieldName, callback) {
  // console.log('-------------------------------- DB ACTIONS ', fieldName, callback);
  return db.update(fieldName, callback).write();
}

// module.exports = {
//   getAll,
//   getField,
//   setField,
// };
