const Router = require("express").Router;
const authenticate = require("./middleware/authenticate");
const gameParticipant = require("./middleware/gameParticipant");
const gameService = require("../services/game");

module.exports = (app) => {
  const router = Router();

  router.ws("/usernames", (ws, req) => {
    console.log(`usernames WebSocket opened for user ${req.session.username}`);
    const result = gameService.getUsernames(req.session, ws);
    if (result.users.length !== 0) {
      ws.send(result.users.join());
    }
    ws.on("message", () => {});
    ws.on("close", () => {
      console.log(
        `usernames WebSocket was closed for user ${req.session.username}`
      );
    });
  });

  router.ws("/number", (ws, req) => {
    gameService.subscribeNumbers(req.session, ws);
    ws.on("message", () => {});
    ws.on("close", () => {
      console.log(
        `number WebSocket was closed for user ${req.session.username}`
      );
    });
  });

  router.ws("/available_cards", (ws, req) => {
    gameService.availableCards(req.session, ws);
    ws.on("message", () => {});
    ws.on("close", () => {
      console.log(
        `available_cards WebSocket was closed for user ${req.session.username}`
      );
    });
  });

  app.use("/ws", authenticate, gameParticipant, router);
  //   app.use("/ws", router);
};
