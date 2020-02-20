import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import * as itemsActions from "../../redux/actions/itemsActions";
import PropTypes from "prop-types";
import VendingItems from "./VendingItems";

const VendingItemsContainer = props => {
    const { items } = props;
    const { positionList, setPositionList } = useState();
    const { slot, setSlot } = useState();

    const dispatch = useDispatch();
    useEffect(() => {
        itemsActions.loadItems(dispatch);
    }, [dispatch]);
    
    const handleDropSlot = (name) => {
        setSlot(name);
    }

    const handleItemsSlot = (items) => {
        let itemPosition = [];
        for (let i = 1; i < 4; i++) {
            for (let j = 1; j < 6; j++) {
                items.forEach(item => {
                    let position = `${i}${j}`;
                    itemPosition.push([item,position])
                });
            }
        }
        setPositionList(itemPosition);
    }

    return (
        <VendingItems
            handleDropSlot={handleDropSlot}
            handleItemsSlot={handleItemsSlot}
            items={items}
            slot={slot}
        />
    );
};

VendingItemsContainer.propTypes = {
    items: PropTypes.array.isRequired,
    positionList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        positionList: state.positionList
    };
}

export default connect(mapStateToProps)(VendingItemsContainer);
