require("dotenv").config();
const express = require("express");
const fs = require("fs");
const https = require("https");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");

const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(morgan("tiny"));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET,POST");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept"
//   );
//   next();
// });

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    // key: "userId",
    store: new (require("connect-pg-simple")(session))(),
    secret: process.env.EXPRESS_COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 3600 * 24 * 30,
      // sameSite: "none",
      // secure: true,
      // httpOnly: true,
      path: "/",
    },
  })
);

// app.use(
//   cors({
//     origin: "*",
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//     credentials: true,
//     methods: ["GET", "POST", "DELETE", "PUT"],
//   })
// );

app.use(express.json());

app.get("/", (req, res) => {
  if (req.session.visitTimes) {
    req.session.visitTimes++;
  } else {
    req.session.visitTimes = 1;
  }

  res.status(202);
  res.json({
    status: "success",
    restuarant: "AA",
    visitTimes: req.session.visitTimes,
  });
});

// Session operations
app.get("/api/v1/login", async (req, res) => {
  if (req.session.userid) {
    res.status(200).json({
      username: req.session.username,
      balance: req.session.userBalance,
      msg: "Login successful",
    });
  } else {
    res.status(401).json({
      msg: "Not logged in",
    });
  }
});

app.post("/api/v1/login", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM users where username=$1 and password=$2",
      [req.body.username, req.body.password]
    );
    if (result.rows.length != 1) {
      res.status(401).json({
        msg: "Wrong username or password",
      });
    } else {
      console.log(result.rows);
      req.session.userid = result.rows[0].id;
      req.session.username = result.rows[0].username;
      req.session.userBalance = result.rows[0].balance;
      res.status(200).json({
        username: req.session.username,
        balance: req.session.userBalance,
        msg: "Login successful",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

app.post("/api/v1/signup", async (req, res) => {
  try {
    const result_max_id = await db.query("SELECT max(id) as max_id FROM users");
    const max_id = Number(result_max_id.rows[0]["max_id"]);
    const result = await db.query(
      "INSERT INTO users (id, firstname, lastname, username, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, phone",
      [
        max_id + 1,
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        req.body.email,
        req.body.phone,
        req.body.password,
      ]
    );
    if (result.rows.length != 1) {
      res.status(500).json({
        msg: "result.rows.length != 1",
      });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

// Todo: put users
// Todo: delete users
// end Session operations

// Cards
app.get("/api/v1/cards", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM cards");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

app.get("/api/v1/cards/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM cards WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rows.length != 1) {
      res.status(500).json({
        msg: "result.rows.length != 1",
      });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }
});

// Todo: post cards
// Todo: put cards
// Todo: delete cards
// Cards end

const server_port = process.env.SERVER_PORT || 3600;
// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
//   .listen(server_port, () => {
//     console.log("Server is up and listening on port " + server_port.toString());
//   });

app.listen(server_port, () => {
  console.log("Server is up and listening on port " + server_port.toString());
});
