import React, { setState, useEffect } from 'react';
import { connect } from 'react-redux';
import './VendingMachine.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import VendingItems from './VendingItemsContainer';
import VendingInput from './VendingInputContainer';
import * as itemsActions from '../../redux/actions/itemsActions';
import * as moneyActions from '../../redux/actions/moneyActions';
import { get } from '../../http/http';
import { handleResponse } from '../../api/apiUtils';

function VendingMachine(props) {
  const {
    items,
    moneyStash,
    actions,
    loadItems,
    loadMoney,
    updateItemSlot,
    updateMoney,
  } = props;

  if (items.length === 0) {
    actions.loadItems().catch((error) => {
      alert(`Loading Items failed${error}`);
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <VendingItems items={items} loadItems={loadItems} updateItemSlot={updateItemSlot} />
        </div>
        <div className="column">
          <VendingInput
            items={items}
            // moneyStash={moneyStash}
            updateItemSlot={updateItemSlot}
            // selectItem={selectItem}
            // loadMoney={loadMoney}
            updateMoney={updateMoney}
          />
        </div>
      </div>
    </div>
  );
}

VendingMachine.propTypes = {
  // items: PropTypes.array.isRequired,
  // moneyStash: PropTypes.object.isRequired,
  // loadItems: PropTypes.func.isRequired,
  // updateItemSlot: PropTypes.func.isRequired,
  // selectItem: PropTypes.func.isRequired,
  // loadMoney: PropTypes.func.isRequired,
  // updateMoney: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  // console.log('ITEMS IN VENDING', state);
  return {
    items: state.items,
    moneyStash: state.moneyStash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadItems: bindActionCreators(itemsActions.loadItems, dispatch),
      updateItemSlot: bindActionCreators(itemsActions.updateItemSlot, dispatch),
      loadMoney: bindActionCreators(moneyActions.loadMoney, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
