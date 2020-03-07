import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import * as itemsActions from '../../redux/actions/itemsActions';
import * as moneyActions from '../../redux/actions/moneyActions';
import VendingInput from './VendingInput';

const VendingInputContainer = (props) => {
  const { items, itemNr, actions } = props;

  const [money, setMoney] = useState(0);
  const [rest, setRest] = useState(0);
  const [itemSelected, setItemSelected] = useState(undefined);
  const [itemAmount, setItemAmount] = useState(0);


  //   const componentDidMount = () => {
  //     if (items.length === 0) {
  //       actions.loadItems().catch(error => {
  //         alert("Loading items failed" + error);
  //       });
  //     }

  //     if (money.stash === 0) {
  //       actions.loadMoney().catch(error => {
  //         alert("Loading money failed" + error);
  //       });
  //     }
  //   }

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   itemsActions.loadItems(dispatch);
  //   // itemsActions.selectItem(dispatch);
  //   moneyActions.loadMoney(dispatch);
  // }, [dispatch]);

  const handleMoney = (event) => {
    const { value } = event.target;
    setMoney(value);
  };

  const handleItemSelection = (event) => {
    const listOfNr = [];
    let isValid = true;
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 6; j++) {
        listOfNr.push(`${i}${j}`);
      }
    }
    listOfNr.forEach((nr) => {
      if (listOfNr !== nr) {
        isValid = false;
      }
    });

    const handleItemAmount = (item) => {
      const { amount } = item;
      setItemAmount(amount - 1);
    };

    if (!isValid) {
      alert('This nr does not exist! Please try again');
      // throw new Error("Invalid input!");
      throw 'Invalid input! ';
      // Promise.resolve(Error("Invalid input!"));
    } else {
      const { value } = event.target;
      setItemSelected(value);
      if (itemSelected) {
        const result = items.filter((nr) => nr === itemSelected);
        if (result) {
          if (result.price <= money) {
            handleItemAmount(result);
            if (result.price < money) {
              setRest(money - result.price);
            }
            return result.name;
          }
        }
      }
    }
    return '';
  };

  const handlePurchase = (event) => {
    event.preventDefault();
    handleItemSelection(event)
      .then(() => {
        toast.success('Item purchased');
      })
      .catch((error) => {
        alert('Purchase Failed ! ', error);
      });
  };

  return (
    <VendingInput
      items={items}
      handleMoney={handleMoney}
      handlePurchase={handlePurchase}
      rest={rest}
      itemAmount={itemAmount}
    />
  );
};

VendingInputContainer.propTypes = {
  items: PropTypes.array.isRequired,
  // money: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  itemSelected: state.itemSelected,
  itemAmount: state.itemAmount,
  money: state.money,
  rest: state.rest,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    loadItems: bindActionCreators(itemsActions.loadItems, dispatch),
    // selectItem: bindActionCreators(itemsActions.selectItem, dispatch),
    updateItemSlot: bindActionCreators(itemsActions.updateItemSlot, dispatch),
    // loadMoney: bindActionCreators(moneyActions.loadMoney, dispatch),
    // updateMoney: bindActionCreators(moneyActions.updateMoney, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VendingInputContainer);
