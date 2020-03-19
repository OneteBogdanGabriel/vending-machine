import React, { useState, useEffect, useCallback } from 'react';
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

  console.log('VENDING INPUT PROPS', props);
  const [inputMoney, setInputMoney] = useState(0);
  const [rest, setRest] = useState(0);
  const [itemSelected, setItemSelected] = useState(undefined);
  const [itemAmount, setItemAmount] = useState(0);
  const [newItem, setNewItem] = useState(undefined);
  const [newMoney, setNewMoney] = useState(0);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log('INput Money', value);
    if (name === 'money') {
      // eslint-disable-next-line radix
      return setInputMoney(parseInt(value));
    }
    if (name === 'item') {
      return setItemSelected(value);
    }
    return '';
  };

  useEffect(() => {
    actions.updateMoneyStash(newMoney);
  },[newMoney]);

  const handleSaveMoney = (event) => {
    event.preventDefault();
    const newObj = { ...moneyStash, inPurchase: inputMoney };
    console.log('moneySTash ', newObj);
    // setNewMoney(newObj).then(actions.updateMoneyStash(newMoney));
    setNewMoney(newObj);
  };

  // if (newMoney && newMoney !== 0) {
  //   // console.log('NEWM MONEY ', newMoney);
  //   actions.updateMoneyStash(newMoney);
  // }

  const handleItemAmount = (item) => {
    const { amount } = item;
    setItemAmount(amount - 1);
  };

  const setItem = (item) => {
    const newObj = { ...item, amount: itemAmount };
    setNewItem(newObj).then(actions.updateItemSlot(newItem));
  };

  const setPurchase = (profit) => {
    const newStash = moneyStash.stash + profit;
    const newObj = { ...moneyStash, stash: newStash, inPurchase: 0 };
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
    if (moneyStash && moneyStash.inPurchase > 0) {
      listOfNr.forEach((nr) => {
        if (value === nr) {
          isValid = true;
        }
      });
    }
    return isValid;
  };

  const handlePurchaseItem = (event) => {
    const { value } = event.target;
    console.log('VALUEEEE ', value);
    if (purchaseValidation(value) === false) {
      alert('This nr does not exist! Please try again');
      throw new Error('Invalid input!');
      // throw 'Invalid input! ';
    } else {
      // setItemSelected(value);
      // if (itemSelected) {
      //   const result = vendingItems.filter((item) => item.itemNr === itemSelected);
      //   if (result) {
      //     if (result.price <= inputMoney) {
      //       if (result.price < inputMoney) {
      //         setRest(inputMoney - result.price);
      //       }
      //       handleItemAmount(result);
      //       // handle updating item & money store
      //       setItem(result);
      //       setPurchase(result.price);

      //       return result.name;
      //     }
      //   }
      // }

      const result = vendingItems.filter((item) => {
        console.log('item result ', item);
        if (item.itemNr === itemSelected) {
          return item;
        }
        return '';
      });
      console.log('Result ', result);
      if (result) {
        if (result.price <= inputMoney) {
          if (result.price < inputMoney) {
            setRest(inputMoney - result.price);
          }
          // handleItemAmount(result);

          // handle updating item & money store
          setItem(result);
          // setPurchase(result.price);

          return result.name;
        }
      }
    }
    return '';
  };

  const handleSaveItem = (event) => {
    event.preventDefault();
    console.log('PURCHASE VALUE ', event.target.value);
    handlePurchaseItem(event);
    // .then(() => {
    //   toast.success('Item purchased');
    // })
    // .catch((error) => {
    //   alert('Purchase Failed ! ', error);
    // });
  };

  return (
    <VendingInput
      handleSaveMoney={handleSaveMoney}
      handleSaveItem={handleSaveItem}
      onChange={handleChange}
      rest={rest}
      moneyStash={moneyStash}
    />
  );
};

VendingInputContainer.propTypes = {
  // items: PropTypes.object.isRequired,
  vendingItems: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  vendingItems: state.items,
  moneyStash: state.moneyStash,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateItemSlot: bindActionCreators(updateItemSlot, dispatch),
    updateMoneyStash: bindActionCreators(updateMoneyStash, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VendingInputContainer);
