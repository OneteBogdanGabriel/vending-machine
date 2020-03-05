const initialState = {
  fetching: false,
  fetched: false,
  items: [],
  moneyStash: {},
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'REQUEST_PENDING': {
      return { ...state, fetching: true };
    }
    case 'REQUEST_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        items: action.payload,
      };
    }
    case 'REQUEST_REJECTED': {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
      return state;
  }
}
