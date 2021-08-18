const shuffle = require("../utils/shuffle");
const uid = require("../utils/uid");
const db = require("../../db");

class Game {
  constructor() {
    this.id = uid(5);
    this.nums = shuffle(1, 90);
    this.drawnIndex = 0;
    this.users = []; // An array of user ids participating in this game
    this.usernameWs = {};
    this.numberSubscribers = {};
    this.availableCardsSubscribers = {};
    this.state = "created"; // created, pause, play
    this.cards = [];
    this.availableCards = [];
    this.numberInterval = null;
    this.userSelectedCard = {};
  }

  addUser(username) {
    const userindex = this.users.indexOf(username);
    if (userindex === -1) {
      this.users.push(username);
      for (const user in this.usernameWs) {
        this.usernameWs[user].send(this.users.join());
      }
    }
  }
  removeUser(username) {
    const userindex = this.users.indexOf(username);
    if (userindex !== -1) {
      this.users.splice(userindex, 1);
    }
  }
  allUserSelectedCard() {
    for (const user of users) {
      if (!user in userSelectedCard) {
        return false;
      }
    }
    return true;
  }

  async fillCards() {
    const result = await db.query("SELECT id FROM cards");
    for (const row of result.rows) {
      const id = parseInt(row.id, 10);
      this.cards.push(id);
      this.availableCards.push(id);
    }
  }
  async getCardNums(cardId) {
    const result = await db.query("SELECT numbers FROM cards where id = $1", [
      cardId,
    ]);
    if (result.rows.length !== 1) {
      throw new Error(`Card with id ${cardId} does not exist`);
    }
    return result.rows[0].numbers;
  }
  async getAvailableCards() {
    if (this.availableCards.length === 0) {
      console.log("There is no card available");
      return [];
    }
    const result = await db.query(
      `SELECT id, numbers FROM cards where id in (${this.availableCards.join(
        ","
      )})`
    );
    if (result.rows.length === 0) {
      console.log("No available card was found");
    }
    return result.rows;
  }
  subscribeAvailableCards(username, ws) {
    this.availableCardsSubscribers[username] = ws;
  }
  selectCard(username, cardId) {
    this.userSelectedCard[username] = cardId;
    this.availableCards = this.availableCards.filter((id) => id !== cardId);
    for (const user in this.availableCardsSubscribers) {
      this.availableCardsSubscribers[user].send(this.availableCards.join());
    }
  }

  draw() {
    if (this.drawnIndex >= this.nums.length) {
      return -1;
    }
    return this.nums[this.drawnIndex++];
  }
  addNumberSubscribers(username, ws) {
    this.numberSubscribers[username] = ws;
  }
  start() {
    this.state = "paly";
    const num = this.draw();
    if (num == -1) {
      clearInterval(this.numberInterval);
    }
    console.log(this.drawnIndex);
    if (this.drawnIndex === 1) {
      // The first draw
      for (const user in this.numberSubscribers) {
        this.numberSubscribers[user].send(num);
      }
    }
    this.numberInterval = setInterval(() => {
      const num = this.draw();
      if (num == -1) {
        clearInterval(this.numberInterval);
      }
      for (const user in this.numberSubscribers) {
        this.numberSubscribers[user].send(num);
      }
    }, 2500);
  }
  pause() {
    clearInterval(this.numberInterval);
    this.state = "pause";
  }
  destroy() {
    clearInterval(this.numberInterval);
  }
  async checkWin(cardId) {
    const cardNumsArr = await this.getCardNums(cardId);
    const cardNums = cardNumsArr.map((arr) => arr[1]);
    for (let i = this.drawnIndex; i < this.nums.length; i++) {
      if (cardNums.indexOf(this.nums[i]) !== -1) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Game;
