import React from 'react';
import PropTypes from 'prop-types';
import './VendingItems.css';

const generateSlot = (item, position) => (
  <div className="column itemSlot" key={item && item.id ? item.id : position}>
    <p>{item ? item.name : 'Empty'}</p>
    <p>{ `Price: ${item ? item.price : '0'}` }</p>
    <p>{ `${item && item.amount > 0 ? item.amount : 'None'} in stock` }</p>
    <p>{`NR ${item ? item.itemNr : '0'}`}</p>
  </div>
);

const generateTable = (items) => {
  const gridView = [];
  let counter = 0;
  if (items && items.length > 0) {
    for (let i = 1; i < 4; i++) {
      const children = [];
      for (let j = 1; j < 5; j++) {
        const position = parseInt(`${i}${j}`);
        if (counter < items.length) {
          const item = items[counter];
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

const displayPurchase = (listPurchasedItems) => {
  if (listPurchasedItems && listPurchasedItems.length > 0) {
    return (
      <p>
        {listPurchasedItems.map((item) => item.name).join(', ')}
      </p>
    );
  }
  return <p>Please come again</p>;
};

const VendingItems = React.memo((props) => {
  const { items, listPurchasedItems } = props;
  return (
    <div className="displaySection">
      <div className="itemsList">
        {generateTable(items)}
      </div>
      <div className="dropSlot">
        {displayPurchase(listPurchasedItems)}
      </div>
    </div>
  );
});

VendingItems.propTypes = {
  listPurchasedItems: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
};

export default VendingItems;
