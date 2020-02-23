import React from "react";
import { connect } from "react-redux";
import * as itemsActions from "../../redux/actions/itemsActions";
import * as moneyActions from "../../redux/actions/moneyActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import VendingItems from "./VendingItems";


class VendingItemsClassContainer extends React.Component {

  componentDidMount() {
    const { items, moneyStash, actions } = this.props;

    if (items.length === 0) {
      actions.loadItems().catch(error => {
        alert("Loading items failed" + error);
      });
    }

    if (moneyStash !== {}) {
      actions.loadMoney().catch(error => {
        alert("Loading money failed" + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2>Items</h2>
            <VendingItems
              items={this.props.items}
              moneyStash={this.props.moneyStash}
            />
      </>
    );
  }
}

VendingItemsClassContainer.propTypes = {
  items: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    items: state.items.map(items => {
            return {
              ...items
            };
          }),
    moneyStash: state.moneyStash
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadItems: bindActionCreators(itemsActions.loadItems, dispatch),
      loadMoney: bindActionCreators(moneyActions.loadMoney, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendingItemsClassContainer);
