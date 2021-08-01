import axios from "axios";

export default axios.create({
  baseURL: `http://${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/cards`,
});
