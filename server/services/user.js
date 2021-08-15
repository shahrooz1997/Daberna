const db = require("../db");

async function signup({
  firstname,
  lastname,
  username,
  email,
  phone,
  password,
}) {
  try {
    const result_max_id = await db.query("SELECT max(id) as max_id FROM users");
    const max_id = Number(result_max_id.rows[0]["max_id"]);
    const result = await db.query(
      "INSERT INTO users (id, firstname, lastname, username, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING username, balance",
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
      return {
        signup: false,
      };
    }
    return {
      signup: true,
      username: result.rows[0].username,
      balance: result.rows[0].balance,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function isAuth(session, username, password) {
  if (session.username) {
    return {
      login: true,
      username: session.username,
      balance: session.userBalance,
    };
  } else {
    if (username === undefined || password === undefined) {
      return {
        login: false,
      };
    } else {
      try {
        const result = await db.query(
          "SELECT * FROM users where username=$1 and password=$2",
          [req.body.username, req.body.password]
        );
        if (result.rows.length != 1) {
          return {
            login: false,
          };
        } else {
          session.username = result.rows[0].username;
          session.userBalance = result.rows[0].balance;
          return {
            login: true,
            username: session.username,
            balance: session.userBalance,
          };
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
}

async function logout(session) {
  session.destroy((err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = {
  signup,
  isAuth,
  logout,
};
