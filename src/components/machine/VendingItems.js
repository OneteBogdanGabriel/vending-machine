import React from 'react';
// import PropTypes from 'prop-types';
import './VendingItems.css';

const generateSlot = (item, position) => (
  <td className="itemSlot" key={item ? item.id : position}>
    <p>{item ? item.name : 'Empty'}</p>
    <p>{ `Price: ${item ? item.price : 0}` }</p>
    <p>{ `${item ? item.amount : 'None'} in stock` }</p>
    <p>{`NR ${position}`}</p>
  </td>
);

const generateTable = (props) => {
  const { items, handleItemNr } = props;

  const table = [];
  let counter = 0;
  if (items && items.length > 0) {
    while (counter < items.length) {
      for (let i = 1; i < 4; i++) {
        const children = [];
        for (let j = 1; j < 5; j++) {
          const position = `${i}${j}`;
          const item = items[counter];
          console.log('GENERATING POSITION ', position);
          handleItemNr(item, position);
          children.push(
            generateSlot(item, position),
          );
          counter++;
        }

        table.push(<tr className="itemRow">{children}</tr>);
      }
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
  <div className="displaySection">
    <table className="itemsList">
      <tbody>
        {generateTable(props)}
      </tbody>
    </table>
    <div className="dropSlot">
      {displayPurchase(props)}
    </div>
  </div>
);

// VendingItems.propTypes = {
//   items: PropTypes.array.isRequired,
//   handleVmItem: PropTypes.func.isRequired,
// };


export default VendingItems;
