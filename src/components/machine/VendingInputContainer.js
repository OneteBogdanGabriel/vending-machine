import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { updateItemAction } from '../../redux/actions/itemsActions';
import { updateMoneyAction } from '../../redux/actions/moneyActions';
import VendingInput from './VendingInput';

const VendingInputContainer = (props) => {
  const {
    vendingItems, moneyStash, actions,
  } = props;

  const [inputMoney, setInputMoney] = useState(0);
  const [rest, setRest] = useState(0);
  const [itemSelected, setItemSelected] = useState(undefined);
  const [itemAmount, setItemAmount] = useState(0);
  const [newItem, setNewItem] = useState(undefined);
  const [newMoney, setNewMoney] = useState(0);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // eslint-disable-next-line radix
    const val = parseInt(value);
    if (name === 'money') {
      return setInputMoney(val);
    }
    if (name === 'item') {
      return setItemSelected(val);
    }
    return '';
  };

  useEffect(() => {
    if (newMoney !== 0) {
      actions.updateMoneyAction(newMoney);
    }
  },[newMoney]);

  const handleSaveMoney = (event) => {
    event.preventDefault();
    const newObj = { ...moneyStash, inPurchase: inputMoney };
    setNewMoney(newObj);
  };

  const handleItemAmount = (item) => {
    const { amount } = item;
    setItemAmount(amount - 1);
  };

  const setItem = (item) => {
    const newObj = { ...item, amount: itemAmount };
    setNewItem(newObj).then(actions.updateItemAction(newItem));
  };

  const setPurchase = (profit) => {
    const newStash = moneyStash.stash + profit;
    const newObj = { ...moneyStash, stash: newStash, inPurchase: 0 };
    setNewMoney(newObj).then(actions.updateMoneyAction(newMoney));
  };

  const purchaseValidation = () => {
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
        if (itemSelected === nr) {
          isValid = true;
        }
      });
    }
    return isValid;
  };

  const handlePurchaseItem = () => {
    if (purchaseValidation() === false) {
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
          return true;
        }
        return false;
      })[0];

      console.log('Result ', result);
      if (result) {
        if (result.price <= inputMoney) {
          if (result.price < inputMoney) {
            setRest(inputMoney - result.price);
            console.log('Rest',rest);
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
  vendingItems: state.items.data,
  moneyStash: state.moneyStash.data,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    updateItemAction: bindActionCreators(updateItemAction, dispatch),
    updateMoneyAction: bindActionCreators(updateMoneyAction, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VendingInputContainer);
