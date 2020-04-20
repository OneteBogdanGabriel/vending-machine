const items = [
  {
    id: 1,
    name: 'Cookie',
    price: 3,
    amount: 10,
    itemNr: null,
    image: './server/items/cookie.jpg',
  },
  {
    id: 2,
    name: 'Protein Bar',
    price: 5,
    amount: 8,
    itemNr: null,
    image: '',
  },
  {
    id: 3,
    name: 'Snickers',
    price: 7,
    amount: 3,
    itemNr: null,
    image: '',
  },
  {
    id: 4,
    name: 'Mars',
    price: 7,
    amount: 4,
    itemNr: null,
    image: '',
  },
  {
    id: 5,
    name: 'Water',
    price: 2,
    amount: 6,
    itemNr: null,
    image: '',
  },
  {
    id: 6,
    name: 'Cola',
    price: 3,
    amount: 5,
    itemNr: null,
    image: '',
  },
  {
    id: 7,
    name: 'Fanta',
    price: 3,
    amount: 10,
    itemNr: null,
    image: '',
  },
  {
    id: 8,
    name: 'Sprite',
    price: 3,
    amount: 8,
    itemNr: null,
    image: '',
  },
  {
    id: 9,
    name: 'Ham & Cheese Sandwich',
    price: 8,
    amount: 2,
    itemNr: null,
    image: '',
  },
  {
    id: 10,
    name: 'Angel Dust',
    price: 120,
    amount: 1,
    itemNr: null,
    image: '',
  },
];

const moneyStash = {
  stash: 100,
  inPurchase: 0,
};

module.exports = {
  items,
  moneyStash,
};
