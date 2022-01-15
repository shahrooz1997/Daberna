const gameService = require("../../services/game");

module.exports = (req, res, next) => {
  try {
    console.log("QWER");
    if (gameService.hasGame(req.session)) {
      next();
    } else {
      res.status(405).json({
        msg: "You are not participating in any game",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
};
