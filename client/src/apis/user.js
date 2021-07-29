import axios from "axios";

process.env.SERVER_ADDR = "192.168.1.5:3600";

export default axios.create({
  baseURL: `http://192.168.1.5:3600/api/v1/login`,
});

export const register = axios.create({
  baseURL: `http://192.168.1.5:3600/api/v1/register`,
});
