import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './VendingMachine.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import VendingItems from './VendingItemsContainer';
import VendingInput from './VendingInputContainer';
import { loadItemsAction, updateItemAction } from '../../redux/actions/itemsActions';
import { loadMoneyAction, updateMoneyAction } from '../../redux/actions/moneyActions';

const VendingMachine = (props) => {
  const {
    items,
    moneyStash,
    actions: {
      boundLoadItemsAction, boundLoadMoneyAction, boundUpdateItemAction, boundMoneyItemAction,
    },
  } = props;

  useEffect(() => {
    if (items && items.data && items.data.length === 0) {
      boundLoadItemsAction().catch((error) => {
        alert(`Loading Items failed${error}`);
      });
    }

    if (moneyStash && moneyStash.data && moneyStash.data !== {}) {
      boundLoadMoneyAction().catch((error) => {
        alert(`Loading Money failed${error}`);
      });
    }
  }, []);

  let vendingItems;
  if (items && items.data && items.data.length > 0) {
    vendingItems = items.data;
  }

  let vendingMoney;
  if (moneyStash && moneyStash.data && moneyStash.data !== {}) {
    vendingMoney = moneyStash.data;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="column columnItems">
          <VendingItems vendingItems={vendingItems} updateItemAction={boundUpdateItemAction} />
        </div>
        <div className="column columnInput">
          <VendingInput
            vendingItems={vendingItems}
            moneyStash={vendingMoney}
            updateItemAction={boundUpdateItemAction}
            updateMoney={boundMoneyItemAction}
          />
        </div>
      </div>
    </div>
  );
};

VendingMachine.propTypes = {
  items: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
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
      boundLoadMoneyAction: bindActionCreators(loadMoneyAction, dispatch),
      boundLoadItemsAction: bindActionCreators(loadItemsAction, dispatch),
      boundUpdateItemAction: bindActionCreators(updateItemAction, dispatch),
      boundUpdateMoneyAction: bindActionCreators(updateMoneyAction, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
