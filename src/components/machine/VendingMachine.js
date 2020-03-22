import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './VendingMachine.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import VendingItems from './VendingItemsContainer';
import VendingInput from './VendingInputContainer';
import { loadItemsAction, updateItemAction } from '../../redux/actions/itemsActions';
import { loadMoney } from '../../redux/actions/moneyActions';

const VendingMachine = (props) => {
  const {
    items,
    moneyStash,
    updateMoney,
    actions: { boundLoadItemsAction },
  } = props;

  console.log('ITEMS in VM ', items);
  useEffect(() => {
    if (items && items.data && items.data.length === 0) {
      // all items, including moneyStash
      console.log('xxx boundLoadItemsAction ', boundLoadItemsAction);
      boundLoadItemsAction();
      // actions.loadItems().catch((error) => {
      //   alert(`Loading Items failed${error}`);
      // });

      // actions.loadMoney().catch((error) => {
      //   alert(`Loading Money failed${error}`);
      // });
    }
  }, []);


  return (
    <div className="container">
      <div className="row">
        <div className="column columnItems">
          <VendingItems vendingItems={items && items.data && items.data.length > 0 ? items.data : undefined} loadItems={loadItemsAction} updateItemAction={updateItemAction} />
        </div>
        <div className="column columnInput">
          <VendingInput
            vendingItems={items && items.data && items.data.length > 0 ? items.data : undefined}
            moneyStash={moneyStash && moneyStash !== {} ? items && items.data : undefined}
            updateItemAction={updateItemAction}
            // selectItem={selectItem}
            updateMoney={updateMoney}
          />
        </div>
      </div>
    </div>
  );
};

VendingMachine.propTypes = {
  items: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  // updateItemAction: PropTypes.func.isRequired,
  // selectItem: PropTypes.func.isRequired,
  updateMoney: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  // these get passed down to the children components, and items (which includes{items[] & moneyStash{}}) has to be here too
  return {
    items: state.items,
    moneyStash: state.moneyStash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadMoney: bindActionCreators(loadMoney, dispatch),
      boundLoadItemsAction: bindActionCreators(loadItemsAction, dispatch),
      updateItemAction: bindActionCreators(updateItemAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
