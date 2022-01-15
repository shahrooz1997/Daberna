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
    username = username.toLowerCase();
    password = password.toLowerCase();
    if (email) {
      email = email.toLowerCase();
    }
    const result_max_id = await db.query("SELECT max(id) as max_id FROM users");
    const max_id = Number(result_max_id.rows[0]["max_id"]);
    const result = await db.query(
      "INSERT INTO users (id, firstname, lastname, username, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING username, balance",
      [max_id + 1, firstname, lastname, username, email, phone, password]
    );
    if (result.rows.length != 1) {
      return {
        signup: false,
      };
    }
    return {
      signup: true,
      username: result.rows[0].username,
      balance: parseInt(result.rows[0].balance, 10),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function isAuth(session, username, password) {
  console.log(session, username, password);
  if (username && password) {
    username = username.toLowerCase();
    password = password.toLowerCase();
  }
  if (session.username) {
    const result = await db.query(
      "SELECT balance FROM users where username=$1",
      [session.username]
    );
    return {
      login: true,
      username: session.username,
      balance: result.rows[0].balance,
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
          [username, password]
        );
        if (result.rows.length != 1) {
          console.log("result.rows.length != 1");
          return {
            login: false,
          };
        } else {
          session.username = result.rows[0].username;
          session.userBalance = parseInt(result.rows[0].balance, 10);
          console.log("AAAA");
          console.log(session);
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
