import * as actions from "../actionTypes";

const initialState = {
  gameid: null,
  gameOwner: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_GAME:
      return { ...state, gameid: action.payload.id, gameOwner: true };
    case actions.JOIN_GAME:
      return { ...state, gameid: action.payload.id };
    default:
      return state;
  }
}
