import axios from "axios";

let serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

let commonAttrs = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createGame = async (betPerCard) => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/game`,
    { betPerCard },
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const joinGame = async (gameId) => {
  const res = await axios.get(
    `http://${serverAddress}/api/v1/game/join/${gameId}`,
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const startGame = async () => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/game/start`,
    {},
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const pauseGame = async () => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/game/pause`,
    {},
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const winGame = async () => {
  const res = await axios.get(`http://${serverAddress}/api/v1/game/win`, {
    ...commonAttrs,
  });
  return res;
};

export const cardSelected = async (body) => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/game/card`,
    body,
    {
      ...commonAttrs,
    }
  );
  return res;
};

export const getAllCards = async () => {
  const res = await axios.get(`http://${serverAddress}/api/v1/game/allcards`, {
    ...commonAttrs,
  });
  return res;
};
