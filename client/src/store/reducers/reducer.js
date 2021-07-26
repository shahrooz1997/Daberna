import * as actions from "../actionTypes";

const initialState = {
  cards: [],
  selectedCardId: -1,
  coveredIndexed: [],
};

const card_exists = (cards, card) => {
  return cards.findIndex((el) => el.id === card.id) !== -1;
};

const get_add_cards = (state, cards) => {
  const saved_cards = state.cards;
  let ret = [];
  cards.forEach((el) => {
    if (!card_exists(saved_cards, el)) {
      ret.push(el);
    }
  });
  return ret;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return state;
    case actions.USER_LOGOUT:
      return state;
    case actions.GET_CARDS:
      return {
        ...state,
        cards: [...state.cards, get_add_cards(action.payload.cards)],
      };
    default:
      return state;
  }
};

export default reducer;
