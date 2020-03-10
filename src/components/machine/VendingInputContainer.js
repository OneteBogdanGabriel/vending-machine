import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { updateItemSlot } from '../../redux/actions/itemsActions';
import { updateMoneyStash } from '../../redux/actions/moneyActions';
import VendingInput from './VendingInput';

const VendingInputContainer = (props) => {
  const {
    vendingItems, moneyStash, actions,
  } = props;

  // console.log('VENDING INPUT PROPS', props);
  const [inputMoney, setInputMoney] = useState(0);
  const [rest, setRest] = useState(0);
  const [itemSelected, setItemSelected] = useState(undefined);
  const [itemAmount, setItemAmount] = useState(0);
  const [newItem, setNewItem] = useState(undefined);
  const [newMoney, setNewMoney] = useState(0);

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    // console.log('INput Money', value);
    if (name === 'money') {
      setInputMoney(value);
    } else {
      setItemSelected(value);
    }
  }

  const handleSaveMoney = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setInputMoney(value);
  };

  const handleItemAmount = (item) => {
    const { amount } = item;
    setItemAmount(amount - 1);
  };

  const setItem = (item) => {
    const newObj = { ...item, amount: itemAmount };
    setNewItem(newObj).then(actions.updateItemSlot(newItem));
  };

  const setMoney = (profit) => {
    const newObj = { ...moneyStash, stash: profit };
    setNewMoney(newObj).then(actions.updateMoneyStash(newMoney));
  };

  const purchaseValidation = (value) => {
    let isValid = false;
    const listOfNr = [];
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 6; j++) {
        // eslint-disable-next-line radix
        listOfNr.push(parseInt(`${i}${j}`));
      }
    }

    listOfNr.forEach((nr) => {
      if (value === nr) {
        isValid = true;
      }
    });

    return isValid;
  };

  const handlePurchaseItem = (event) => {
    const { value } = event.target;
    if (purchaseValidation(value) === false) {
      alert('This nr does not exist! Please try again');
      throw new Error('Invalid input!');
      // throw 'Invalid input! ';
    } else {
      setItemSelected(value);
      if (itemSelected) {
        const result = vendingItems.filter((item) => item.itemNr === itemSelected);
        if (result) {
          if (result.price <= inputMoney) {
            if (result.price < inputMoney) {
              setRest(inputMoney - result.price);
            }
            handleItemAmount(result);
            // handle updating item & money store
            setItem(result);
            setMoney(result.price);

            return result.name;
          }
        }
      }
    }
    return '';
  };

  const handleSaveItem = (event) => {
    event.preventDefault();
    console.log('PURCHASE VALUE ', event.target.value);
    handlePurchaseItem(event)
      .then(() => {
        toast.success('Item purchased');
      })
      .catch((error) => {
        alert('Purchase Failed ! ', error);
      });
  };

  return (
    <VendingInput
      handleSaveMoney={handleSaveMoney}
      handleSaveItem={handleSaveItem}
      onChange={handleChange}
      rest={rest}
    />
  );
};

VendingInputContainer.propTypes = {
  // items: PropTypes.object.isRequired,
  vendingItems: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  // actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.items,
  vendingItems: state.items.items,
  moneyStash: state.items.money,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateItemSlot: bindActionCreators(updateItemSlot, dispatch),
    updateMoneyStash: bindActionCreators(updateMoneyStash, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VendingInputContainer);
