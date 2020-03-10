import React from 'react';
import './VendingInput.css';

const VendingInput = (props) => {
  const {
    handleSaveMoney, handleSaveItem, onChange, rest, itemNr, moneyAmount,
  } = props;
  return (
    <div className="UI">
      <form onSubmit={handleSaveMoney}>
        <div className="inputFields">
          <label>Insert money</label>
          <input
            name="money"
            type="number"
            value={moneyAmount}
            onChange={onChange}
          />
        </div>
      </form>
      <form onSubmit={handleSaveItem}>
        <div className="inputFields">
          <label>Select Item</label>
          <input
            name="item"
            type="number"
            value={itemNr}
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
