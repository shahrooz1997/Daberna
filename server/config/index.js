const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

module.exports = {
  port: parseInt(process.env.SERVER_PORT, 10) || 3600,

  cookieSecret: process.env.EXPRESS_COOKIE_SECRET,

  api: {
    prefix: "/api/v1",
  },
};
