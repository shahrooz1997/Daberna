const Router = require("express").Router;
const authenticate = require("./middleware/authenticate");
const gameService = require("../services/game");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = gameService.createGame(req.session);
    res.status(201).json({
      gameId: result.gameId,
      msg: "Game created",
    });
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.get("/cards", async (req, res) => {
  try {
    gameService.getAvailableCards(req.session);
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

module.exports = (app) => {
  app.use("/game", authenticate, router);
};

router.get("/win", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

module.exports = (app) => {
  app.use("/game", authenticate, router);
};
