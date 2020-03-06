import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as itemsActions from '../../redux/actions/itemsActions';
import VendingItems from './VendingItems';
import store from '../../redux/reducers/storeReducer';

const VendingItemsContainer = (props) => {
  const { items } = props;
  const { positionList, setPositionList } = useState();
  const { slot, setSlot } = useState();

  const dispatch = useDispatch();
  // useEffect(() => {
  //   itemsActions.loadItems(dispatch);
  // }, [dispatch]);

  useEffect(() => {
    if (items.length === 0) {
      itemsActions.loadItems();
    }
  }, [items]);

  const handleDropSlot = (name) => {
    store.subscribe(() => {
      setSlot(name);
    });
  };

  const handleItemsSlot = () => {
    const itemPosition = [];
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 6; j++) {
        items.forEach((item) => {
          const position = `${i}${j}`;
          itemPosition.push([item, position]);
        });
      }
    }
    store.subscribe(() => {
      setPositionList(itemPosition);
    });
  };

  return (
    <VendingItems
      handleDropSlot={handleDropSlot}
      handleItemsSlot={handleItemsSlot}
      items={items}
      slot={slot}
    />
  );
};

VendingItemsContainer.propTypes = {
  items: PropTypes.array.isRequired,
  positionList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  positionList: state.positionList,
});

export default connect(mapStateToProps)(VendingItemsContainer);
