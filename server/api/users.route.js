const Router = require("express").Router;

const router = Router();

router.post("/signup", (req, res) => {});

router.post("/login", (req, res) => {});

router.get("login", (req, res) => {});

module.exports = (app) => {
  app.use("/user", route);
};
