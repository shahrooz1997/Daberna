import * as actions from "../actionTypes";

const initialState = {
  gameid: null,
  betPerCard: -1,
  gameOwner: false,
  users: [],
  ws: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_GAME:
      return {
        ...state,
        gameid: action.payload.id,
        gameOwner: true,
        betPerCard: action.payload.bet,
      };
    case actions.JOIN_GAME:
      return {
        ...state,
        gameid: action.payload.id,
        betPerCard: action.payload.bet,
      };
    case actions.ADD_USER:
      return { ...state, users: [...state.users, action.payload.username] };
    case actions.SET_WS:
      return { ...state, ws: action.payload.ws };
    case actions.RESET_GAME:
      return initialState;
    default:
      return state;
  }
}
