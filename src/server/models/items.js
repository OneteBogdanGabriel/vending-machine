import { getField, updateField } from '../dbActions';

export function getItems() {
  return getField('items');
}

const handleUpdateItem = (data) => (items) => items.map((item) => {
  if (item.id === data.id) {
    // update || return previous value
    const newItem = {
      ...item,
      amount: data.amount || items.amount,
      itemNr: data.itemNr || items.itemNr,
    };
    return newItem;
  }
  return item;
});

export function updateItem(item) {
  return updateField('items', handleUpdateItem(item));
}
