import React, { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { updateItemAction } from '../../redux/actions/itemsActions';
import { updateMoneyAction } from '../../redux/actions/moneyActions';
import VendingInput from './VendingInput';

const VendingInputContainer = (props) => {
  const {
    vendingItems, moneyStash, handlePurchasedItem, actions,
  } = props;

  const [inputMoney, setInputMoney] = useState(0);
  const [rest, setRest] = useState(undefined);
  const [itemSelected, setItemSelected] = useState(undefined);
  const [newItem, setNewItem] = useState(undefined);
  const [newMoney, setNewMoney] = useState(0);
  const [listPurchased, setListPurchased] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const val = parseInt(value);

    if (name === 'money') {
      if (moneyStash && moneyStash.inPurchase > 0) {
        const sum = val + moneyStash.inPurchase;
        return setInputMoney(sum);
      }
      return setInputMoney(val);
    }
    if (name === 'item') {
      return setItemSelected(val);
    }
    return '';
  };

  useEffect(() => {
    actions.updateMoneyAction(newMoney);

    if (newItem !== undefined) {
      actions.updateItemAction(newItem);
      setListPurchased(listPurchased.concat(newItem));
    }
  },[newMoney]);

  useEffect(() => {
    handlePurchasedItem(listPurchased);
  },[listPurchased]);

  const handleSaveMoney = (event) => {
    event.preventDefault();
    const newObj = { ...moneyStash, inPurchase: inputMoney };
    setNewMoney(newObj);
    document.getElementsByClassName('inputForm')[0].reset();
  };

  const setItem = (item) => {
    const newObj = { ...item, amount: item.amount - 1 };
    setNewItem(newObj);
  };

  const setPurchase = (profit) => {
    const newStash = moneyStash.stash + profit;
    const newObj = { ...moneyStash, stash: newStash, inPurchase: parseInt(0) };
    setNewMoney(newObj);
  };

  const purchaseValidation = () => {
    let isValid = false;
    const listOfNr = [];
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 6; j++) {
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

  // FOR SINGLE PURCHASE ONLY
  // const handlePurchaseItem = () => {
  //   if (purchaseValidation() === false) {
  //     alert('This nr does not exist! Please try again');
  //     throw new Error('Invalid input!');
  //     // throw 'Invalid input! ';
  //   } else {
  //     const result = vendingItems.filter((item) => {
  //       if (item.itemNr === itemSelected) {
  //         return true;
  //       }
  //       return false;
  //     })[0];

  //     if (result) {
  //       if (result.price <= inputMoney) {
  //         if (result.price < inputMoney) {
  //           setRest(inputMoney - result.price);
  //         }
  //         setItem(result);
  //         setPurchase(result.price);
  //         document.getElementsByClassName('inputForm')[1].reset();
  //         // return result.name;
  //       }
  //     }
  //   }
  //   return '';
  // };

  const result = vendingItems.filter((item) => {
    if (item.itemNr === itemSelected) {
      return true;
    }
    return false;
  })[0];

  const handleSaveItem = (event) => {
    event.preventDefault();
    if (purchaseValidation() === false) {
      alert('This nr does not exist! Please try again');
      throw new Error('Invalid input!');
      // throw 'Invalid input! ';
    } else {
      if (result) {
        if (result.price <= moneyStash.inPurchase) {
          setItem(result);
          const moneyLeft = moneyStash.inPurchase-result.price;
          const newObj = { ...moneyStash, inPurchase: moneyLeft };
          setNewMoney(newObj);
          document.getElementsByClassName('inputForm')[1].reset();
        }
      }
      return '';
    }
  };

  // const handleSaveItem = (event) => {
  //   event.preventDefault();
  //   handlePurchaseItem(event);
  //   // .then(() => {
  //   //   toast.success('Item purchased');
  //   // })
  //   // .catch((error) => {
  //   //   alert('Purchase Failed ! ', error);
  //   // });
  // };

  const handleRest = () => {
    setRest(moneyStash.inPurchase);
    if (result) {
      setPurchase(result.price);
    } else {
      // eslint-disable-next-line radix
      const newObj = { ...moneyStash, inPurchase: parseInt(0) };
      setNewMoney(newObj);
    }
  };

  const handleCollectRest = () => {
    setRest(0);
  };

  return (
    <VendingInput
      handleRest={handleRest}
      handleCollectRest={handleCollectRest}
      handleSaveMoney={handleSaveMoney}
      handleSaveItem={handleSaveItem}
      onChange={handleChange}
      rest={rest}
      moneyStash={moneyStash}
    />
  );
};

VendingInputContainer.propTypes = {
  vendingItems: PropTypes.array.isRequired,
  moneyStash: PropTypes.object.isRequired,
  handlePurchasedItem: PropTypes.func.isRequired,
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
