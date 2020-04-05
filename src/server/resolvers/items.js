
import { getItems, updateItem } from '../models/items';

export function updateItemsNr() {
  let counter = 0;
  const vendingItems = getItems();
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 5; j++) {
    // eslint-disable-next-line radix
      const position = parseInt(`${i}${j}`);
      if (counter < vendingItems.length) {
        const item = vendingItems[counter];
        const newObj = { ...item, itemNr: position };
        updateItem(newObj);
      }
      counter++;
    }
  }
  return '';
}

// TODO : complete this with validations
export function updateItemAmount(item) {
  return updateItem(item);
}
