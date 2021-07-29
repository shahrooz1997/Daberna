import axios from "axios";

let serverAddress = "localhost:3600";

let commonAttrs = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const login = async (body) => {
  const res = await axios.post(`http://${serverAddress}/api/v1/login/`, body, {
    ...commonAttrs,
  });
  return res;
};

export const isLoggedIn = async () => {
  const res = await axios.get(`http://${serverAddress}/api/v1/login/`, {
    ...commonAttrs,
  });
  return res;
};

// export const register = async (body) => {
//   const res = await axios.post(`http://${serverAddress}/api/v1/login/`, body, {
//     ...commonAttrs,
//   });
// };
