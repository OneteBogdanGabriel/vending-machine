import * as types from "../actions/actionTypes";

export default function moneyReducer(state = [], action) {
    switch(action.type) {
        case types.UPDATE_MONEY_SUCCESS:
            return  state.map(stash =>
                stash.stash === action.money ? stash.stash + action.money : stash.stash
              );
        case types.LOAD_MONEY_SUCCESS:
            return action.money;
        default:
            return state;
    }
}