import { getField, updateField } from '../dbActions';

export function getItems() {
  return getField('items');
}

const handleUpdateItem = (data) => (items) => items.map((item) => {
  console.log('-------------------------------------------------------Handle items ', data);
  if (item.id === data.id) {
    // update || return previous value
    const newItem = {
      ...item,
      amount: data.amount || item.amount,
      itemNr: data.itemNr || item.itemNr,
    };
    return newItem;
  }
  return item;
});

export function updateItem(item) {
  updateField('items', handleUpdateItem(item));
}
