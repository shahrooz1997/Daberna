import * as actions from "./actionTypes";

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

export const selectCard = (id) => ({
  type: actions.SELECT_CARD,
  payload: {
    id,
  },
});

export const coverNumber = (index) => ({
  type: actions.COVER_NUMBER,
  payload: {
    index,
  },
});

export const uncoverNumber = (index) => ({
  type: actions.UNCOVER_NUMBER,
  payload: {
    index,
  },
});

export const init = () => ({
  type: actions.INITIALIZE,
  payload: {},
});

export const createGame = (gameid) => ({
  type: actions.CREATE_GAME,
  payload: {
    id: gameid,
  },
});

export const joinGame = (gameid) => ({
  type: actions.JOIN_GAME,
  payload: {
    id: gameid,
  },
});
