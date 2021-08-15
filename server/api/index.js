const Router = require("express").Router;
const user = require("./users.route");
const cards = require("./cards.route");

export default () => {
  const app = Router();
  user(app);
  cards(app);
  return app;
};
