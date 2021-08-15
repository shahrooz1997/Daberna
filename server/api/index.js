const Router = require("express").Router;
const user = require("./user.route");
const cards = require("./cards.route");
const game = require("./game.route");

module.exports = () => {
  const app = Router();
  user(app);
  cards(app);
  game(app);
  return app;
};
