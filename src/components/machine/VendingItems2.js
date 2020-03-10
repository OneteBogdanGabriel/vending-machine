import React from 'react';
// import PropTypes from 'prop-types';
import './VendingItems.css';

const generateSlot = (item, position) => (
  <div className="column itemSlot" key={item ? item.id : position}>
    <p>{item ? item.name : 'Empty'}</p>
    <p>{ `Price: ${item ? item.price : '0'}` }</p>
    <p>{ `${item && item.amount > 0 ? item.amount : 'None'} in stock` }</p>
    <p>{`NR ${position}`}</p>
  </div>
);

const generateTable = (props) => {
  const { items, handleItemNr } = props;
  const gridView = [];
  let counter = 0;
  if (items && items.length > 0) {
    for (let i = 1; i < 4; i++) {
      const children = [];
      for (let j = 1; j < 5; j++) {
        // eslint-disable-next-line radix
        const position = parseInt(`${i}${j}`);
        if (counter < items.length) {
          const item = items[counter];
          console.log('Counter ', counter);
          if (item && item.itemNr === null) {
            handleItemNr(item, position);
          }
          children.push(
            generateSlot(item, position),
          );

          counter++;
        } else {
          children.push(
            generateSlot(null, position),
          );
          counter++;
        }
      }

      gridView.push(<div className="row itemRow" key={i.toString()}>{children}</div>);
    }
  }
  return gridView;
};

const displayPurchase = (item) => {
  if (item && item.length > 0) {
    return <p>{item.name}</p>;
  }
  return <p>Please come again</p>;
};


const VendingItems = React.memo((props) => (
  <div className="displaySection">
    <div className="itemsList">
      {generateTable(props)}
    </div>
    <div className="dropSlot">
      {displayPurchase(props)}
    </div>
  </div>
));

// VendingItems.propTypes = {
//   items: PropTypes.array.isRequired,
//   handleVmItem: PropTypes.func.isRequired,
// };


export default VendingItems;
