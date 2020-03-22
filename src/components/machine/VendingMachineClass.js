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

const baseUrl = 'http://localhost:3001/machine';

class VendingMachine extends React.Component {
  // Save local state or dispatch redux action

  componentDidMount() {
    const {
      items,
      moneyStash,
      actions,
      loadItems,
      loadMoney,
      updateItemAction,
      updateMoney,
    } = this.props;
    if (items.length === 0) {
      actions.loadItems().catch((error) => {
        alert(`Loading items failed${error}`);
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="column">
            <VendingItems items={this.items} loadItems={this.loadItems} updateItemAction={this.updateItemAction} />
          </div>
          <div className="column">
            <VendingInput
              items={this.items}
              // moneyStash={moneyStash}
              updateItemAction={this.updateItemAction}
              // selectItem={selectItem}
              // loadMoney={loadMoney}
              updateMoney={this.updateMoney}
            />
          </div>
        </div>
      </div>
    );
  }
}
VendingMachine.propTypes = {
  items: PropTypes.array.isRequired,
  // moneyStash: PropTypes.object.isRequired,
  loadItems: PropTypes.func.isRequired,
  updateItemAction: PropTypes.func.isRequired,
  // selectItem: PropTypes.func.isRequired,
  loadMoney: PropTypes.func.isRequired,
  updateMoney: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  console.log('ITEMS IN VENDING', state);
  return {
    items: state.items,
    moneyStash: state.moneyStash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadItems: bindActionCreators(itemsActions.loadItems, dispatch),
      updateItemAction: bindActionCreators(itemsActions.updateItemAction, dispatch),
      loadMoney: bindActionCreators(moneyActions.loadMoney, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
