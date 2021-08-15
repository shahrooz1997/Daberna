const Router = require("express").Router;
const authenticate = require("./middleware/authenticate");
const userService = require("../services/user");

const router = Router();

router.post("/signup", (req, res) => {
  try {
    const userRecord = await userService.signup({ ...req.body });
    if (userRecord.signup) {
      res.status(200).json({
        username: userRecord.username,
        balance: userRecord.userBalance,
        msg: "Signup successful",
      });
    } else {
      res.status(409).json({
        msg: "The email or username exist",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const userRecord = await userService.isAuth(
      req.session,
      req.body.username,
      req.body.password
    );
    if (userRecord.login) {
      res.status(200).json({
        username: userRecord.username,
        balance: userRecord.userBalance,
        msg: "Login successful",
      });
    } else {
      res.status(401).json({
        msg: "Wrong username or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.get("/login", async (req, res) => {
  try {
    const userRecord = await userService.isAuth(req.session);
    if (userRecord.login) {
      res.status(200).json({
        username: userRecord.username,
        balance: userRecord.userBalance,
        msg: "Logged in",
      });
    } else {
      res.status(401).json({
        msg: "Not logged in",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

router.post("/logout", authenticate, async (req, res) => {
  try {
    userService.logout(req.session);
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

module.exports = (app) => {
  app.use("/user", route);
};
