const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const config = require("../config");
const routes = require("../api");

module.exports = ({ app }) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });
  app.enable("trust proxy");

  app.use(morgan("dev"));
  app.use((req, res, next) => {
    console.log(req.socket.remoteAddress);
    next();
  });

  //   app.use((req, res, next) => {
  //     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //     res.header("Access-Control-Allow-Methods", "GET,POST");
  //     res.header(
  //       "Access-Control-Allow-Headers",
  //       "Origin,X-Requested-With,Content-Type,Accept"
  //     );
  //     next();
  //   });
  app.use(
    cors({
      origin: [
        "http://hzare.me:3000",
        "http://34.133.211.59:3000",
        "http://localhost:3000",
        "http://192.168.1.5:3000",
      ],
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

  // app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    session({
      store: new (require("connect-pg-simple")(session))(),
      secret: config.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 3600 * 24 * 30,
        // sameSite: "none",
        // secure: true,
        httpOnly: false,
        path: "/",
      },
    })
  );

  app.use(config.api.prefix, routes());

  // Todo
  //   // catch 404 and forward to error handler
  //   app.use((req, res, next) => {
  //     const err = new Error("Not Found");
  //     err["status"] = 404;
  //     next(err);
  //   });

  //   // error handlers
  //   app.use((err, req, res, next) => {
  //     /**
  //      * Handle 401 thrown by express-jwt library
  //      */
  //     if (err.name === "UnauthorizedError") {
  //       return res.status(err.status).send({ message: err.message }).end();
  //     }
  //     return next(err);
  //   });
  //   app.use((err, req, res, next) => {
  //     res.status(err.status || 500);
  //     res.json({
  //       errors: {
  //         message: err.message,
  //       },
  //     });
  //   });
};
