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

function VendingMachine(props) {
  // Save local state or dispatch redux action
  console.log('ITEMS IN VM', props);
  const {
    items,
    moneyStash,
    actions,
    loadItems,
    loadMoney,
    updateItem,
    updateMoney,
  } = props;

  useEffect(() => {
    get(baseUrl).then((data) => {
      console.log('DATA', data);
      if (items.length === 0) {
        actions.loadItems().catch((error) => {
          alert(`Loading items failed${error}`);
        });
      }

      if (moneyStash !== {}) {
        actions.loadMoney().catch((error) => {
          alert(`Loading money failed${error}`);
        });
      }
    });

    // fetch(baseUrl).then(
    //   response => setState({ items: response.items }) // this triggers a re-render!
    // );
  }, [actions, items.length, loadItems, loadMoney, moneyStash, props]);

  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <VendingItems items={items} loadItems={loadItems} />
        </div>
        <div className="column">
          <VendingInput
            items={items}
            moneyStash={moneyStash}
            updateItem={updateItem}
            // selectItem={selectItem}
            loadMoney={loadMoney}
            updateMoney={updateMoney}
          />
        </div>
      </div>
    </div>
  );
}

VendingMachine.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  items: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  loadItems: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
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
      loadMoney: bindActionCreators(moneyActions.loadMoney, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
