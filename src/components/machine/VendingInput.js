import React from 'react';
import './VendingInput.css';

const VendingInput = (props) => {
  const {
    handleSaveMoney, handleSaveItem, onChange, rest, moneyStash,
  } = props;
  console.log('VENDING INPUT MONEY ', moneyStash);
  return (
    <div className="UI">
      <form onSubmit={handleSaveMoney}>
        <div className="inputFields">
          <label>
            Money:
            {moneyStash ? moneyStash.inPurchase : 0}
          </label>
          <input
            name="money"
            type="number"
            // value={moneyStash ? moneyStash.inPurchase : 0}
            onChange={onChange}
          />
        </div>
      </form>
      <form onSubmit={handleSaveItem}>
        <div className="inputFields">
          <label>Item</label>
          <input
            name="item"
            type="number"
            // value={itemNr}
            onChange={onChange}
          />
        </div>
      </form>
      <div className="inputFields">
        <label>Rest</label>
        <p>{rest && rest > 0 ? rest : ''}</p>
      </div>
    </div>
  );
};

export default VendingInput;
