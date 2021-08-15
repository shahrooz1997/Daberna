const Router = require("express").Router;
const authenticate = require("./middleware/authenticate");
const cardService = require("../services/cards");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await cardService.getAllCards();
    if (result.length > 0) {
      res.status(200).json({
        result,
      });
    } else {
      res.status(500).json({
        msg: "No card found",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

// Todo
router.get("/:id", authenticate, async (req, res) => {});

module.exports = (app) => {
  app.use("/cards", authenticate, router);
};
