import { getField, updateField } from '../dbActions';

// eslint-disable-next-line import/prefer-default-export
export function getMoneyStash() {
  return getField('moneyStash');
}

const handleUpdateMoney = (data) => (money) => {
  // update || return previous value
  const newMoneyStash = {
    ...money,
    stash: data.stash,
    inPurchase: data.inPurchase,
  };
  return newMoneyStash;
};

export function updateMoney(money) {
  return updateField('moneyStash', handleUpdateMoney(money)).moneyStash;
}
