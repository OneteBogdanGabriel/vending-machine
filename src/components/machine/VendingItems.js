import React from 'react';
// import PropTypes from 'prop-types';
import './VendingItems.css';

const generateSlot = (item, position) => (
  <td className="itemSlot" key={item ? item.id : position}>
    <p>{item ? item.name : 'Empty'}</p>
    <p>{item ? item.amount : 'None'}</p>
    <p>{`NR ${position}`}</p>
  </td>
);

const generateTable = (props) => {
  const { items, handleItemNr } = props;
  const table = [];
  let counter = 0;
  while (counter < items.length) {
    for (let i = 1; i < 4; i++) {
      const children = [];
      for (let j = 1; j < 5; j++) {
        const position = `${i}${j}`;
        const item = items[counter];

        handleItemNr(item, position);
        // debugger;
        children.push(
          generateSlot(item, position),
        );
        counter++;
      }

      table.push(<tr>{children}</tr>);
    }
  }
  return table;
};

const displayPurchase = (item) => {
  if (item && item.length > 0) {
    return <p>{item.name}</p>;
  }
  return <p>Please come again</p>;
};


const VendingItems = (props) => (
  <>
    <table className="itemsList">
      <tbody>
        {generateTable(props)}
      </tbody>
    </table>
    <div className="dropSlot">
      {displayPurchase(props)}
    </div>
  </>
);

// VendingItems.propTypes = {
//   items: PropTypes.array.isRequired,
//   handleVmItem: PropTypes.func.isRequired,
// };


export default VendingItems;
