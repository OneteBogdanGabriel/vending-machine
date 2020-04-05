import React from 'react';
import './VendingInput.css';

const VendingInput = (props) => {
  const {
    handleSaveMoney, handleSaveItem, handleRest, handleCollectRest, onChange, rest, moneyStash,
  } = props;

  return (
    <div className="UI">
      <form onSubmit={handleSaveMoney} className="inputForm">
        <div className="inputFields">
          <label className="labels">
            Money:&nbsp;
            {moneyStash && moneyStash.inPurchase ? moneyStash.inPurchase : 0}
          </label>
          <input
            name="money"
            type="number"
            onChange={onChange}
          />
        </div>
      </form>
      <form onSubmit={handleSaveItem} className="inputForm">
        <div className="inputFields">
          <label className="labels">Item</label>
          <input
            name="item"
            type="number"
            onChange={onChange}
          />
        </div>
      </form>
      <div className="inputFields">
        <button type="button" onClick={handleRest} className="restBtn">Rest</button>
        <input readOnly value={rest && rest > 0 ? rest : ''} onClick={handleCollectRest} className="rest" />
      </div>
    </div>
  );
};

export default VendingInput;
