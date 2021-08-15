const db = require("../db");

async function getAllCards() {
  try {
    const result = await db.query("SELECT * FROM cards");
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  getAllCards,
};
