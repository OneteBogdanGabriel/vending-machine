import { updateMoney } from '../models/moneyStash';

// TODO : complete this with validations
// eslint-disable-next-line import/prefer-default-export
export function updateMoneyStash(money) {
  console.log('Money Resolver ', money);
  return updateMoney(money);
}
