import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.7:3600/api/v1/cards",
});
