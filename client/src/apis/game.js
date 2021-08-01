import axios from "axios";

let serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

let commonAttrs = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const createGame = async () => {
  const res = await axios.get(`http://${serverAddress}/api/v1/game`, {
    ...commonAttrs,
  });
  return res;
};

export const joinGame = async (body) => {
  const res = await axios.post(
    `http://${serverAddress}/api/v1/game/join`,
    body,
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

export const winGame = async () => {
  const res = await axios.get(
    `http://${serverAddress}/api/v1/game/win`,
    {},
    {
      ...commonAttrs,
    }
  );
  return res;
};
