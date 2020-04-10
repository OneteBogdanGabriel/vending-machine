import React, { useState, useEffect } from 'react';
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
  const [rest, setRest] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const [newMoney, setNewMoney] = useState(0);
  const [listPurchased, setListPurchased] = useState([]);

  useEffect(() => {
    actions.updateMoneyAction(newMoney);
  },[newMoney]);

  useEffect(() => {
    if (newItem !== null) {
      actions.updateItemAction(newItem);
      setListPurchased(listPurchased.concat(newItem));
    }
  },[newItem]);

  useEffect(() => {
    handlePurchasedItem(listPurchased);
  },[listPurchased]);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const val = parseInt(value);

    if (val >= 0) {
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
    }
    return '';
  };

  const handleSaveMoney = (event) => {
    event.preventDefault();
    const newObj = { ...moneyStash, inPurchase: inputMoney };
    setNewMoney(newObj);
    document.getElementsByClassName('inputForm')[0].reset();
  };

  const setItem = (item) => {
    const newAmount = item.amount - 1;
    if (newAmount >= 0) {
      const newObj = { ...item, amount: newAmount };
      return setNewItem(newObj);
    }
    return '';
  };

  const purchaseValidation = () => {
    let isValid = false;
    const listOfNr = [];
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 5; j++) {
        listOfNr.push(parseInt(`${i}${j}`));
      }
    }

    if (itemSelected === null) {
      alert('No item selected !');
    } else if (moneyStash && moneyStash.inPurchase > 0) {
      let isNr = false;
      listOfNr.forEach((nr) => {
        if (itemSelected === nr) {
          isValid = true;
          isNr = true;
        }
      });
      if (!isNr) {
        alert('Purchase failed ! Number is not valid !');
      }
    } else {
      alert('Purchase failed ! No money left !');
    }

    return isValid;
  };


  const handleSaveItem = (event) => {
    event.preventDefault();
    if (purchaseValidation() === false) {
      return '';
      // alert('Purchase failed');
      // throw new Error('Invalid input!');
    }
    const result = vendingItems.filter((item) => {
      if (item.itemNr === itemSelected) {
        return true;
      }
      return false;
    })[0];
    if (result) {
      if (result.price <= moneyStash.inPurchase) {
        if (result.amount > 0) {
          setItem(result);
          const newStash = moneyStash.stash + result.price;
          const moneyLeft = moneyStash.inPurchase-result.price;
          const newObj = { ...moneyStash, stash: newStash, inPurchase: moneyLeft };

          setNewMoney(newObj);
          setItemSelected(null);
          document.getElementsByClassName('inputForm')[1].reset();
        } else {
          alert('Item out of stock');
        }
      } else {
        alert('Not enough money !');
      }
    }
    return '';
  };

  const handleRest = () => {
    if (rest > 0) {
      const totalRest = rest + moneyStash.inPurchase;
      setRest(totalRest);
    } else {
      setRest(moneyStash.inPurchase);
    }

    const newObj = { ...moneyStash, inPurchase: 0 };
    setNewMoney(newObj);
    setNewItem(null);

    document.getElementsByClassName('inputForm')[0].reset();
    document.getElementsByClassName('inputForm')[1].reset();
  };

  const handleCollectRest = () => {
    setRest(0);
    // document.getElementsByClassName('rest')[2].reset();
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
