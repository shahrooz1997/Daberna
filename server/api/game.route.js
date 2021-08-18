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
    console.log(err);
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

    if (result.cards.length !== 0) {
      res.status(200).json({
        cards: result.cards,
      });
    } else {
      res.status(403).json({
        msg: "No card is available",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.post("/card", gameParticipant, async (req, res) => {
  try {
    const result = gameService.selectCard(
      req.session,
      parseInt(req.body.cardId)
    );

    if (result.selected) {
      res.status(200).json({
        msg: `card ${req.body.cardId} selected`,
      });
    } else {
      res.status(403).json({
        msg: `couldn't select card ${req.body.cardId}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.post("/start", gameParticipant, async (req, res) => {
  try {
    const result = await gameService.startGame(req.session);
    if (result.start) {
      res.status(200).json({
        msg: "Game started",
      });
    } else {
      res.status(200).json({
        msg: "Only owner can start the game",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.post("/pause", gameParticipant, async (req, res) => {
  try {
    const result = await gameService.pauseGame(req.session);
    if (result.pause) {
      res.status(200).json({
        msg: "Game paused",
      });
    } else {
      res.status(200).json({
        msg: "Only owner can pause the game",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.get("/win", gameParticipant, async (req, res) => {
  try {
    const result = await gameService.hasWon(req.session);
    res.status(200).json({
      win: result.win,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

module.exports = (app) => {
  app.use("/game", authenticate, router);
};
