import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { updateItemAction } from '../../redux/actions/itemsActions';
import { updateMoneyAction } from '../../redux/actions/moneyActions';
import VendingInput from './VendingInput';
import {
  alertNoMoneyInserted, alertNoItemSelected, alertNumberInvalid, alertNoMoneyLeft, alertOutOfStock, alertNotEnoughMoney,
} from '../../server/public/other/texts';

const VendingInputContainer = (props) => {
  const {
    vendingItems, moneyStash, handlePurchasedItem, actions,
  } = props;

  const [inputMoney, setInputMoney] = useState(0);
  const [rest, setRest] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const [newMoney, setNewMoney] = useState({});
  const [listPurchased, setListPurchased] = useState([]);
  // const [listPurchasedItem, setListPurchasedItem] = useState(null);

  useEffect(() => {
    if (Object.keys(newMoney).length !== 0) {actions.updateMoneyAction(newMoney);} // isEmpty not working
  },[newMoney]);

  useEffect(() => {
    if (newItem !== null) {
      actions.updateItemAction(newItem);
      const listLength = listPurchased.length;
      let purchase;
      if (listLength === 0) {
        purchase = { item: newItem, amount: 1 };
        setListPurchased(listPurchased.concat(purchase));// push doesnt work here
      } else {
        for (let i = 0; i<listLength; i++) {
          if (listPurchased[i].item.id === newItem.id) {
            const newAmount = listPurchased[i].amount + 1;

            purchase = { item: newItem, amount: newAmount };
            const newList = [...listPurchased.slice(0,i),purchase,...listPurchased.slice(i+1)];
            setListPurchased(newList);
          } else {
            purchase = { item: newItem, amount: 1 };
            setListPurchased(listPurchased.concat(purchase));
          }
        }
      }
    }
  },[newItem]);

  useEffect(() => {
    handlePurchasedItem(listPurchased);
  },[listPurchased]);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (value) {
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
    }

    return '';
  };

  const handleSaveMoney = (event) => {
    event.preventDefault();
    if (inputMoney) {
      const newObj = { ...moneyStash, inPurchase: inputMoney };
      setNewMoney(newObj);
      setInputMoney(0);
    } else {
      alert(alertNoMoneyInserted);
    }

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
      alert(alertNoItemSelected);
    } else if (moneyStash && moneyStash.inPurchase > 0) {
      let isNr = false;
      listOfNr.forEach((nr) => {
        if (itemSelected === nr) {
          isValid = true;
          isNr = true;
        }
      });
      if (!isNr) {
        document.getElementsByClassName('inputForm')[1].reset();
        alert(alertNumberInvalid);
      }
    } else {
      document.getElementsByClassName('inputForm')[1].reset();
      alert(alertNoMoneyLeft);
    }

    return isValid;
  };


  const handleSaveItem = (event) => {
    event.preventDefault();
    if (purchaseValidation() === false) {
      setItemSelected(null);
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
          setInputMoney(0);
          document.getElementsByClassName('inputForm')[0].reset();
          document.getElementsByClassName('inputForm')[1].reset();
        } else {
          alert(alertOutOfStock);
        }
      } else {
        alert(alertNotEnoughMoney);
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
    setInputMoney(0);

    document.getElementsByClassName('inputForm')[0].reset();
    document.getElementsByClassName('inputForm')[1].reset();
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
  actions: PropTypes.object.isRequired,
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
