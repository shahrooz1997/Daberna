const userService = require("../services/user");

module.exports = (req, res, next) => {
  try {
    const userRecord = await userService.isAuth(req.session);
    if (userRecord.login) {
      next();
    } else {
      res.status(401).json({
        msg: "You need to log in",
      });
    }
  } catch (err) {
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
};
