import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './VendingMachine.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import VendingItems from './VendingItemsContainer';
import VendingInput from './VendingInputContainer';
import { loadItems, updateItemSlot } from '../../redux/actions/itemsActions';
import { loadMoney } from '../../redux/actions/moneyActions';

const VendingMachine = (props) => {
  const {
    items,
    vendingItems,
    moneyStash,
    actions,
    updateMoney,
  } = props;

  useEffect(() => {
    if (items && items.length === 0) {
      // all items, including moneyStash
      actions.loadItems().catch((error) => {
        alert(`Loading Items failed${error}`);
      });

      actions.loadMoney().catch((error) => {
        alert(`Loading Money failed${error}`);
      });
    }
  });


  return (
    <div className="container">
      <div className="row">
        <div className="column columnItems">
          <VendingItems vendingItems={vendingItems} loadItems={loadItems} updateItemSlot={updateItemSlot} />
        </div>
        <div className="column columnInput">
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

VendingMachine.propTypes = {
  items: PropTypes.object.isRequired,
  vendingItems: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  loadItems: PropTypes.func.isRequired,
  loadMoney: PropTypes.func.isRequired,
  // updateItemSlot: PropTypes.func.isRequired,
  // selectItem: PropTypes.func.isRequired,
  updateMoney: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
};

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
      loadMoney: bindActionCreators(loadMoney, dispatch),
      loadItems: bindActionCreators(loadItems, dispatch),
      updateItemSlot: bindActionCreators(updateItemSlot, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
