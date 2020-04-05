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
          <label>
            Money:
            {moneyStash && moneyStash.inPurchase ? moneyStash.inPurchase : 0}
          </label>
          <input
            name="money"
            type="number"
            // value={moneyStash ? moneyStash.inPurchase : 0}
            onChange={onChange}
          />
        </div>
      </form>
      <form onSubmit={handleSaveItem} className="inputForm">
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
        <button type="button" onClick={handleRest} className="restBtn">Rest</button>
        <label>Rest</label>
        <input readOnly value={rest && rest > 0 ? rest : ''} onClick={handleCollectRest} className="rest" />
        {/* <p onClick={handleCollectRest}>{rest && rest > 0 ? rest : ''}</p> */}
      </div>
    </div>
  );
};

export default VendingInput;
