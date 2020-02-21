import React, { setState, useEffect } from "react";
import { connect } from "react-redux";
import "./VendingMachine.css";
import PropTypes from "prop-types";
import VendingItems from "./VendingItemsContainer";
import VendingInput from "./VendingInputContainer";
import {
  loadItems,
  updateItem
  // selectItem
} from "../../redux/actions/itemsActions";
import { loadMoney, updateMoney } from "../../redux/actions/moneyActions";
import { get } from "../../http/http";
import { handleResponse } from "../../api/apiUtils";

const baseUrl = "http://localhost:3001/machine";

function VendingMachine({
  items,
  moneyStash,
  loadItems,
  updateItem,
  // selectItem,
  loadMoney,
  updateMoney,
  ...props
}) {
  // Save local state or dispatch redux action
  console.log("ITEMS IN VM", items);
  useEffect(() => {
    get("http://localhost:3001/machine").then(data => {
      console.log("DATA", data);
      loadItems().catch(error => {
        alert("Loading items failed" + error);
      });

      loadMoney().catch(error => {
        alert("Loading money failed" + error);
      });
    });

    // fetch(baseUrl).then(
    //   response => setState({ items: response.items }) // this triggers a re-render!
    // );
  }, [loadItems, loadMoney]);

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
  items: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  loadItems: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  // selectItem: PropTypes.func.isRequired,
  loadMoney: PropTypes.func.isRequired,
  updateMoney: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log("ITEMS IN VENDING", state);
  return {
    items: state.items,
    moneyStash: state.moneyStash
  };
}

const mapDispatchToProps = {
  loadItems,
  updateItem,
  // selectItem,
  loadMoney,
  updateMoney
};

export default connect(mapStateToProps, mapDispatchToProps)(VendingMachine);
