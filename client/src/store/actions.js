import * as actions from "./actionTypes";

export const userLogin = () => ({
  type: actions.USER_LOGIN,
  payload: {},
});

export const userLogout = () => ({
  type: actions.USER_LOGOUT,
  payload: {},
});

export const getAllCards = (cards) => ({
  type: actions.GET_ALL_CARDS,
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

export const addUser = (username) => ({
  type: actions.ADD_USER,
  payload: {
    username,
  },
});
