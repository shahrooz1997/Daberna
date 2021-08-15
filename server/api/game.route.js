const Router = require("express").Router;
const authenticate = require("./middleware/authenticate");
const gameParticipant = require("./middleware/gameParticipant");
const gameService = require("../services/game");

const router = Router();

// Create a game.
router.get("/", async (req, res) => {
  try {
    const result = await gameService.createGame(req.session);
    if (result.gameId) {
      res.status(201).json({
        gameId: result.gameId,
        msg: "Game created",
      });
    } else {
      res.status(501).json({
        msg: "Couldn't create a game",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

// Join a game.
router.get("/join/:id", async (req, res) => {
  try {
    const result = gameService.joinGame(req.session, req.params.id);
    if (result.joined) {
      res.status(200).json({
        gameId: result.gameId,
        msg: "Joined the game",
      });
    } else {
      res.status(403).json({
        msg: "Game not found or has already started",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

// These routes work only after creating or joining a game.

// Get all available cards
router.get("/cards", gameParticipant, async (req, res) => {
  try {
    const result = await gameService.getAvailableCards(req.session);
    res.status(200).json({
      cards: result.cards,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.get("/win", gameParticipant, async (req, res) => {
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
