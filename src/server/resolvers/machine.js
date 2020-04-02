import { getItems, getMoneyStash } from '../models';

// eslint-disable-next-line import/prefer-default-export
export function getAll() {
  const items = getItems();
  const money = getMoneyStash();
  const all = {
    items,
    money,
  };
  return all;
}
