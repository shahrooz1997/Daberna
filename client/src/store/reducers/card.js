import * as actions from "../actionTypes";

const initialState = {
  cards: [],
  selectedCard: null,
  coveredNumbers: [1, 2, 3, 4, 5],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CARDS:
      return state;

    default:
      return state;
  }
}
