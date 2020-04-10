import { getField, updateField } from '../dbActions';

// eslint-disable-next-line import/prefer-default-export
export function getMoneyStash() {
  return getField('moneyStash');
}

const handleUpdateMoney = (data) => (money) => {
  // update || return previous value
  // all this checking because if I return data.x = 0, it will interpret as false :/
  const newMoneyStash = {
    ...money,
    stash: (data.stash !== null && data.stash !== undefined && data.stash !== false) ? data.stash : money.stash,
    inPurchase: (data.inPurchase !== null && data.inPurchase !== undefined && data.inProgress !== false) ? data.inPurchase : money.inPurchase,
  };
  return newMoneyStash;
};

export function updateMoney(money) {
  return updateField('moneyStash', handleUpdateMoney(money)).moneyStash;
}
