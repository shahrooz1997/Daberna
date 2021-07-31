import * as actions from "../actionTypes";

const initialState = {
  gameid: null,
  gameOwner: false,
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.CREATE_GAME:
      return { ...state, gameid: action.payload.id, gameOwner: true };
    case actions.JOIN_GAME:
      return { ...state, gameid: action.payload.id };
    case actions.ADD_USER:
      return { ...state, users: [...state.users, action.payload.username] };
    default:
      return state;
  }
}
