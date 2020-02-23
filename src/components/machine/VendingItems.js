import React from "react";
import "./VendingItems.css";

const VendingItems = (props) => {
    console.log("ITEMS PROPS",props)
    return (
        <React.Fragment>
            <div className="itemsList">
                {generateTable(props)}
            </div>
            <div className="dropSlot">
                {displayPurchase(props)}
            </div>
        </React.Fragment>
    );
}
// key={props.id}
const generateTable = (props) => {
    const { items } = props;
    
    let table = []
    let counter = 0;
    // while(counter < items.length)
    // {
        for (let i = 1; i < 4; i++) {
        let children = []

        for (let j = 1; j < 6; j++) {
            // children.push(<td>{`Column ${j + 1}`}</td>)
            children.push(
                <td className="itemSlot">
                    <p>{items.length > 0 ? items[counter].name : "something"}</p>
                    <p>{items.length > 0 ? items[counter].amount : "undefined"}</p>
                    <p>{`NR ${i}${j}`}</p>
                </td>
                )
            counter++;
        }

        table.push(<tr>{children}</tr>)
        }
    // }
    return table;
}

const displayPurchase = (item) => {
    if(item & item.length > 0) {
        return <p>{item.name}</p>;
    }
    return <p>Please come again</p>;
}

export default VendingItems;