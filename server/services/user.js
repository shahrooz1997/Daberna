const db = require("../db");
// class User {
//   constructor() {}
//   isAuth(sessionOrUsername, password) {
//     if (typeof sessionOrUsername === "object") {
//       const session = sessionOrUsername;
//       if (session.username) {
//         return true;
//       } else {
//         return false;
//       }
//     } else {
//     }
//   }
// }

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

module.exports = {
  isAuth,
};
