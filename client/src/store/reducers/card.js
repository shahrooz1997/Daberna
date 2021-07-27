import * as actions from "../actionTypes";

const initialState = {
  cards: [],
  selectedCard: null,
  coveredNumbers: [1, 2, 3, 4, 5],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CARDS:
      return { ...state, cards: action.payload.cards };

    case actions.SELECT_CARD:
      return { ...state, selectedCard: action.payload.id };

    case actions.COVER_NUMBER:
      return {
        ...state,
        coveredNumbers: [...state.coveredNumbers, action.payload.index],
      };

    case actions.UNCOVER_NUMBER:
      return {
        ...state,
        coveredNumbers: state.coveredNumbers.filter(
          (n) => n !== action.payload.index
        ),
      };

    default:
      return state;
  }
}
