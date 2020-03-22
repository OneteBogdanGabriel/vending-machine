import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { updateItemSlot } from '../../redux/actions/itemsActions';
import VendingItems from './VendingItems2';
// import store from '../../redux/reducers/storeReducer';

const VendingItemsContainer = (props) => {
  const { vendingItems, actions } = props;

  // const [slotNr, setSlotNr] = useState(0);
  const [newItem, setNewItem] = useState(null);

  // const handleDropSlot = (name) => {
  //   store.subscribe(() => {
  //     setSlotNr(name);
  //   });
  // };

  // useEffect(() => {
  //   console.log('USEFFECT');
  //   actions.updateItemSlot((prevItem) => ([...prevItem, ...newItem]));
  // },[newItem]);

  // useEffect(() => {
  //   console.log('USEFFECT');
  //   actions.updateItemSlot(newItem);
  // },[newItem]);

  const handleItemNr = (slotItem, position) => {
    // console.log('Slot ', slotItem);
    // console.log('slotNr ', position);
    // eslint-disable-next-line prefer-const
    // let counter = 0;
    const newObj = { ...slotItem, itemNr: position };
    console.log('newObj ', newObj);
    // setNewItem(updateItemSlotNr(newObj,counter));
    setNewItem(newObj);
    // console.log('newItem ',newItem);
    // if (newItem && newItem !== {}) {
    //   actions.updateItemSlot(newItem);
    // }

    // setNewItem(newObj).then(actions.updateItemSlot(newItem));
  };

  useEffect(() => {
    let counter = 0;

    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 5; j++) {
        // eslint-disable-next-line radix
        const position = parseInt(`${i}${j}`);
        console.log('HERE WE ARE', vendingItems);
        if (counter < vendingItems.length) {
          const item = vendingItems[counter];
          // handleItemNr(item, position);
          console.log('Item, ',item);
          const newObj = { ...item, itemNr: position };
          console.log('newObj ', newObj);
          actions.updateItemSlot(newObj);
          // setNewItem(newObj);
          // console.log('newItem ',newItem);
        }
        counter++;
        // setCounter(counter+1);
      }
    }
  }, []);

  const callbackItemNr = useCallback(handleItemNr, []);

  return (
    <VendingItems
      // handleDropSlot={handleDropSlot}
      handleItemNr={callbackItemNr}
      items={vendingItems}
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
      updateItemSlot: bindActionCreators(updateItemSlot, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingItemsContainer);
