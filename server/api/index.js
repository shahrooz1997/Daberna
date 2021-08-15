const Router = require("express").Router;
const user = require("./user.route");
const cards = require("./cards.route");

module.exports = () => {
  const app = Router();
  user(app);
  cards(app);
  return app;
};
