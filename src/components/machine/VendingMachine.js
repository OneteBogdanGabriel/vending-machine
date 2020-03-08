import React from 'react';
import { connect } from 'react-redux';
import './VendingMachine.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import VendingItems from './VendingItemsContainer';
import VendingInput from './VendingInputContainer';
import * as itemsActions from '../../redux/actions/itemsActions';
import * as moneyActions from '../../redux/actions/moneyActions';

const VendingMachine = (props) => {
  const {
    items,
    vendingItems,
    moneyStash,
    actions,
    loadItems,
    loadMoney,
    updateItemSlot,
    updateMoney,
  } = props;

  if (items && items.length === 0) {
    // all items, including moneyStash
    actions.loadItems().catch((error) => {
      // eslint-disable-next-line no-alert
      alert(`Loading Items failed${error}`);
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <VendingItems vendingItems={vendingItems} loadItems={loadItems} updateItemSlot={updateItemSlot} />
        </div>
        <div className="column">
          <VendingInput
            vendingItems={vendingItems}
            moneyStash={moneyStash}
            updateItemSlot={updateItemSlot}
            // selectItem={selectItem}
            updateMoney={updateMoney}
          />
        </div>
      </div>
    </div>
  );
};

// VendingMachine.propTypes = {
//   items: PropTypes.object.isRequired,
//   vendingItems: PropTypes.array.isRequired,
//   moneyStash: PropTypes.object.isRequired,
//   loadItems: PropTypes.func.isRequired,
//   updateItemSlot: PropTypes.func.isRequired,
//   // selectItem: PropTypes.func.isRequired,
//   updateMoney: PropTypes.func.isRequired,
//   actions: PropTypes.object.isRequired,
// };

function mapStateToProps(state) {
  // these get passed down to the children components, and items (which includes{items[] & moneyStash{}}) has to be here too
  return {
    items: state.items,
    vendingItems: state.items.items,
    moneyStash: state.items.moneyStash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      // money also loaded here
      loadItems: bindActionCreators(itemsActions.loadItems, dispatch),
      updateItemSlot: bindActionCreators(itemsActions.updateItemSlot, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
