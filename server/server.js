require("dotenv").config();
const express = require("express");
const fs = require("fs");
const https = require("https");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

// Todo: use bcrypt to save password hashes instead of the passwords themselves
// Watch https://www.youtube.com/watch?v=sTHWNPVNvm8

app.use(morgan("tiny"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: fs.readFileSync("./secret.key"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 3600 * 24,
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
  console.log("Send a message");
  res.status(202);
  res.json({
    status: "success",
    restuarant: "AA",
  });
});

// Session operations
app.post("/api/v1/login", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM users where username=$1 and password=$2",
      [req.body.username, req.body.password]
    );
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "There has been an error on the server",
    });
  }

  res.status(200).send("To be implemented");
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
