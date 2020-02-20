import React from "react";
import "./VendingInput.css";

const VendingInput = (props) => {
    const { items, handleMoney, handlePurchase, rest, itemAmount } = props;

    return(
        <div className="UI">
            <form onSubmit={handleMoney}>
                <div className="inputFields">
                    <label>Insert money</label>
                    <input name="money" type="number"></input>
                </div>
            </form>
            <form onSubmit={handlePurchase}>
                <div className="inputFields">
                    <label>Select Item</label>
                    <input name="item" type="number"></input>
                </div>
                <div className="inputFields">
                    <label>Rest</label>
                    <p>{rest && rest > 0 ? rest : ""}</p>
                </div>
            </form>
        </div>
    );
}

export default VendingInput;