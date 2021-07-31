import * as actions from "../actionTypes";

const initialState = {
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN:
      return { ...state, isLoggedIn: true };
    case actions.USER_LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default reducer;
