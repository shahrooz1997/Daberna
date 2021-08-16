const expressLoader = require("./express");
const wsLoader = require("./ws");

module.exports = (toLoadModules) => {
  wsLoader(toLoadModules);
  expressLoader(toLoadModules);
};
