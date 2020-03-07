import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as itemsActions from '../../redux/actions/itemsActions';
import VendingItems from './VendingItems';
import store from '../../redux/reducers/storeReducer';

const VendingItemsContainer = (props) => {
  const { items, item } = props;
  const { slot, setSlot } = useState();
  const [vmItem, setVmItem] = useState(item);

  const handleDropSlot = (name) => {
    store.subscribe(() => {
      setSlot(name);
    });
  };

  // useEffect(() => {
  //   console.log('Loaded Items ',items);
  // });

  const handleItemNr = (slotItem, position) => {
    // setVmItem({ ...itm, itemNr: position });
    // itemsActions.updateItemSlot(vmItem);
    // let newItem = Object.assign({},item, {itemNr: position});
    const newItem = { ...slotItem, itemNr: position };
    itemsActions.updateItemSlot(newItem);
    // console.log('item & position', `${newItem.itemNr} ${position}`);
  };

  // const handleItemsSlot = () => {
  //   const itemPosition = [];
  //   for (let i = 1; i < 4; i++) {
  //     for (let j = 1; j < 6; j++) {
  //       items.forEach((item) => {
  //         const position = `${i}${j}`;
  //         itemPosition.push([item, position]);
  //       });
  //     }
  //   }
  //   store.subscribe(() => {
  //     setPositionList(itemPosition);
  //   });
  // };

  return (
    <VendingItems
      handleDropSlot={handleDropSlot}
      // handleItemsSlot={handleItemsSlot}
      handleItemNr={handleItemNr}
      items={items}
      slot={slot}
    />
  );
};

// VendingItemsContainer.propTypes = {
//   items: PropTypes.array.isRequired,
//   // positionList: PropTypes.array.isRequired,
//   // actions: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  items: state.items,
  // positionList: state.positionList,
});

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       updateItemSlot: bindActionCreators(itemsActions.updateItemSlot, dispatch),
//     },
//   };
// }

export default connect(mapStateToProps)(VendingItemsContainer);
