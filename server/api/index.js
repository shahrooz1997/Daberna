const Router = require("express").Router;
const user = require("./users.route");

export default () => {
  const app = Router();
  user(app);
  return app;
};
