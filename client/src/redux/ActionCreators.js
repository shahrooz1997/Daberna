import * as actions from "./ActionTypes";

export const userLogin = (username, password) => ({
  type: actions.USER_LOGIN,
  payload: {
    username: username,
    password: password,
  },
});

export const userLogout = (username) => ({
  type: actions.USER_LOGOUT,
  payload: {
    username, // It is the same as username: username because both have the same name
  },
});

export const getCards = (cards) => ({
  type: actions.GET_CARDS,
  payload: {
    cards,
  },
});
