import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { updateItemAction } from '../../redux/actions/itemsActions';
import VendingItems from './VendingItems2';
// import store from '../../redux/reducers/storeReducer';

const VendingItemsContainer = (props) => {
  const { vendingItems: { data, isFulfilled }, actions } = props;
  console.log('VENDING ITEMS CONTAINER ', data);
  // const [slotNr, setSlotNr] = useState(0);
  const [newItem, setNewItem] = useState(null);

  // const handleDropSlot = (name) => {
  //   store.subscribe(() => {
  //     setSlotNr(name);
  //   });
  // };

  // useEffect(() => {
  //   console.log('USEFFECT');
  //   actions.updateItemAction((prevItem) => ([...prevItem, ...newItem]));
  // },[newItem]);

  // useEffect(() => {
  //   console.log('USEFFECT');
  //   actions.updateItemAction(newItem);
  // },[newItem]);

  const handleItemNr = (slotItem, position) => {
    // console.log('Slot ', slotItem);
    // console.log('slotNr ', position);
    // eslint-disable-next-line prefer-const
    // let counter = 0;
    const newObj = { ...slotItem, itemNr: position };
    console.log('newObj ', newObj);
    // setNewItem(updateItemActionNr(newObj,counter));
    setNewItem(newObj);
    // console.log('newItem ',newItem);
    // if (newItem && newItem !== {}) {
    //   actions.updateItemAction(newItem);
    // }

    // setNewItem(newObj).then(actions.updateItemAction(newItem));
  };

  useEffect(() => {
    let counter = 0;

    if (isFulfilled) {
      for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 5; j++) {
          // eslint-disable-next-line radix
          const position = parseInt(`${i}${j}`);
          console.log('HERE WE ARE', data);
          if (counter < data.length) {
            const item = data[counter];
            // handleItemNr(item, position);
            console.log('Item, ',item);
            const newObj = { ...item, itemNr: position };
            console.log('newObj ', newObj);
            actions.updateItemAction(newObj);
            // setNewItem(newObj);
            // console.log('newItem ',newItem);
          }
          counter++;
          // setCounter(counter+1);
        }
      }
    }
  }, [data, isFulfilled]);

  const callbackItemNr = useCallback(handleItemNr, []);

  return (
    <VendingItems
      // handleDropSlot={handleDropSlot}
      handleItemNr={callbackItemNr}
      items={data}
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
