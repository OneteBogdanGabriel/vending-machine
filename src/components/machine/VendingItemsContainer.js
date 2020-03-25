import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { updateItemAction } from '../../redux/actions/itemsActions';
import VendingItems from './VendingItems2';
// import store from '../../redux/reducers/storeReducer';

const VendingItemsContainer = (props) => {
  // const { vendingItems: { data, isFulfilled }, actions } = props;
  const { vendingItems, actions } = props;
  // console.log('VENDING ITEMS CONTAINER ', data);
  // const [slotNr, setSlotNr] = useState(0);
  const [newItem, setNewItem] = useState(null);

  // const handleDropSlot = (name) => {
  //   store.subscribe(() => {
  //     setSlotNr(name);
  //   });
  // };

  const handleItemNr = (slotItem, position) => {
    const newObj = { ...slotItem, itemNr: position };
    setNewItem(newObj);
  };

  useEffect(() => {
    let counter = 0;
    // when promise from action is fulfilled
    if (vendingItems.isFulfilled) {
      for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 5; j++) {
          // eslint-disable-next-line radix
          const position = parseInt(`${i}${j}`);
          console.log('HERE WE ARE', vendingItems.data);
          if (counter < vendingItems.data.length) {
            const item = vendingItems.data[counter];
            // handleItemNr(item, position);
            console.log('Item, ',item);
            const newObj = { ...item, itemNr: position };
            console.log('newObj ', newObj);
            actions.updateItemAction(newObj);
          }
          counter++;
        }
      }
    }
  }, [vendingItems.data, vendingItems.isFulfilled]);

  const callbackItemNr = useCallback(handleItemNr, []);

  return (
    <VendingItems
      // handleDropSlot={handleDropSlot}
      handleItemNr={callbackItemNr}
      items={vendingItems.data}
    />
  );
};

VendingItemsContainer.propTypes = {
  vendingItems: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vendingItems: state.items,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      updateItemAction: bindActionCreators(updateItemAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingItemsContainer);
