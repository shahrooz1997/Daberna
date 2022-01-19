const shuffle = require("../utils/shuffle");
const uid = require("../utils/uid");
const db = require("../../db");

class Game {
  constructor(betPerCard, owner) {
    this.id = uid(5);
    this.nums = shuffle(1, 90);
    console.log(this.nums);
    this.drawnIndex = 0;
    this.users = {}; // An array of user ids participating in this game
    this.usernameWs = {};
    this.numberSubscribers = {};
    this.availableCardsSubscribers = {};
    this.state = "created"; // created, pause, play
    this.cards = [];
    this.availableCards = [];
    this.numberInterval = null;
    this.userSelectedCard = {};
    this.claimers = [];
    this.winClaimed = false;
    this.gamefee = betPerCard;
    this.pot = 0;
    this.owner = owner;
  }

  addUser(username) {
    if (!(username in this.users)) {
      if (this.getUserBalance(username) <= this.gamefee) {
        console.log("Not enough credit");
        return;
      }
      this.updateBalance(username, -1 * this.gamefee);
      this.users[username] = false;
      for (const user in this.usernameWs) {
        this.usernameWs[user].send(
          JSON.stringify({ type: "users", payload: { users: this.users } })
        );
      }
      this.pot += parseInt(this.gamefee);
    }
  }
  removeUser(username) {
    if (username in this.users) {
      delete this.users[username];
      for (const user in this.usernameWs) {
        this.usernameWs[user].send(
          JSON.stringify({ type: "users", payload: { users: this.users } })
        );
      }
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
  async getAllCards() {
    const result = await db.query(
      `SELECT id, numbers FROM cards where id in (${this.cards.join(",")})`
    );
    if (result.rows.length === 0) {
      console.log("No available card was found");
    }
    return result.rows;
  }
  async getAvailableCards() {
    if (this.availableCards.length === 0 || this.state !== "created") {
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
    ws.send(
      JSON.stringify({
        type: "availableCardsIds",
        payload: { availableCardsIds: this.availableCards },
      })
    );
  }
  unsubscribeAvailableCards(username) {
    delete this.availableCardsSubscribers[username];
  }
  selectCard(username, cardId) {
    if (
      this.availableCards.find((v) => {
        if (v == cardId) {
          return true;
        }
        return false;
      }) === undefined
    ) {
      return false;
    }
    this.userSelectedCard[username] = cardId;
    this.availableCards = this.availableCards.filter((id) => id !== cardId);
    for (const user in this.availableCardsSubscribers) {
      this.availableCardsSubscribers[user].send(
        JSON.stringify({
          type: "availableCardsIds",
          payload: { availableCardsIds: this.availableCards },
        })
      );
    }
    return true;
  }

  draw() {
    if (this.drawnIndex >= this.nums.length) {
      return -1;
    }
    return this.nums[this.drawnIndex++];
  }
  addNumberSubscribers(username, ws) {
    this.numberSubscribers[username] = ws;
    if (this.drawnIndex !== 0) {
      ws.send(
        JSON.stringify({
          type: "number",
          payload: { number: this.nums[this.drawnIndex - 1] },
        })
      );
    }
  }
  removeNumberSubscriber(username, ws) {
    delete this.numberSubscribers[username];
  }
  start() {
    for (const user in this.users) {
      if (!this.users[user]) {
        return false;
      }
    }

    this.availableCards = [];
    this.state = "paly";
    console.log(this.drawnIndex);
    // if (this.drawnIndex === 0) {
    //   // The first draw
    //   const num = this.draw();
    //   console.log("SSS");
    //   console.log(num);
    //   if (num == -1) {
    //     clearInterval(this.numberInterval);
    //   }
    //   for (const user in this.numberSubscribers) {
    //     this.numberSubscribers[user].send(
    //       JSON.stringify({
    //         type: "number",
    //         payload: {number: num},
    //       })
    //     );
    //   }
    // }
    for (const user in this.numberSubscribers) {
      this.numberSubscribers[user].send(
        JSON.stringify({
          type: "startgame",
          payload: {},
        })
      );
    }
    this.numberInterval = setInterval(() => {
      const num = this.draw();
      if (num == -1) {
        clearInterval(this.numberInterval);
      }
      for (const user in this.numberSubscribers) {
        this.numberSubscribers[user].send(
          JSON.stringify({
            type: "number",
            payload: { number: num },
          })
        );
      }
    }, 4000);
    return true;
  }
  pause() {
    clearInterval(this.numberInterval);
    for (const user in this.numberSubscribers) {
      this.numberSubscribers[user].send(
        JSON.stringify({
          type: "pausegame",
          payload: {},
        })
      );
    }
    this.state = "pause";
  }
  destroy() {
    clearInterval(this.numberInterval);
  }
  async checkWin(cardId, startIndex = this.drawnIndex) {
    const cardNumsArr = await this.getCardNums(cardId);
    const cardNums = cardNumsArr.map((arr) => arr[1]);
    for (let i = startIndex; i < this.nums.length; i++) {
      if (cardNums.indexOf(this.nums[i]) !== -1) {
        return false;
      }
    }
    return true;
  }
  claimWin(username, cardId) {
    this.claimers.push([username, cardId]);
    console.log(2222);
    console.log(this.claimers);
    if (this.winClaimed === false) {
      this.winClaimed = true;
      clearInterval(this.numberInterval);
      // Send out the claim to the users
      for (const user in this.numberSubscribers) {
        this.numberSubscribers[user].send(
          JSON.stringify({
            type: "win",
            payload: {},
          })
        );
      }
      setTimeout(async () => {
        const res = await Promise.all(
          this.claimers.map(async (claimer) => {
            return this.checkWin(claimer[1]);
          })
        );
        this.claimers = this.claimers.filter((claimer, index) => res[index]);
        console.log(1111);
        console.log(this.claimers);
        if (this.claimers.length === 0) {
          // Send out game continue
          for (const user in this.numberSubscribers) {
            this.numberSubscribers[user].send(
              JSON.stringify({
                type: "nowin",
                payload: {},
              })
            );
          }
          this.winClaimed = false;
          if (this.state === "paly") {
            setTimeout(() => {
              this.start();
            }, 2000);
          }

          return;
        }
        let tempDrawnIndex = this.drawnIndex;
        while (tempDrawnIndex > 0) {
          tempDrawnIndex -= 1;
          console.log(tempDrawnIndex);

          const res = await Promise.all(
            this.claimers.map(async (claimer) => {
              return this.checkWin(claimer[1], tempDrawnIndex);
            })
          );
          let toBeRemovedIndex = res.map((v, index) => {
            if (v) {
              return -1;
            } else {
              return index;
            }
          });
          console.log(`to be removed: ${toBeRemovedIndex}`);
          console.log(res);
          console.log(toBeRemovedIndex);
          toBeRemovedIndex = toBeRemovedIndex.filter((i) => i !== -1);
          console.log(toBeRemovedIndex);
          console.log(this.claimers);
          console.log("EEEE");
          if (toBeRemovedIndex.length === this.claimers.length) {
            // Send out the winners
            for (const user in this.numberSubscribers) {
              this.numberSubscribers[user].send(
                JSON.stringify({
                  type: "winners",
                  payload: { winners: this.claimers.map((v) => v[0]) },
                })
              );
            }
            console.log(this.claimers);
            this.claimers = this.claimers.map((v) => v[0]);
            console.log(this.claimers);
            const winAmount = this.pot / this.claimers.length;
            console.log(winAmount);
            for (const user in this.claimers) {
              console.log(this.claimers[user], winAmount);
              this.updateBalance(this.claimers[user], winAmount);
            }
            return;
          }
          this.claimers = this.claimers.filter((claimer, index) => {
            console.log("filter");
            console.log(toBeRemovedIndex);
            console.log(index);
            console.log(toBeRemovedIndex.indexOf(index));
            console.log(toBeRemovedIndex.indexOf(index) !== -1);
            return toBeRemovedIndex.indexOf(index) === -1;
          });
        }
      }, 5000);
    }
  }
  async getUserBalance(username) {
    const result = await db.query(
      "SELECT balance from users where username = $1",
      [username]
    );
    if (result.rows.length !== 1) {
      throw new Error(`user with username ${username} does not exist`);
    }
    return parseFloat(result.rows[0].balance);
  }
  async putUserBalance(username, newBalance) {
    const result = await db.query(
      "Update users SET balance = $1 where username = $2",
      [newBalance, username]
    );
    if (result.rowCount !== 1) {
      throw new Error(`user with username ${username} does not exist`);
    }
  }
  async updateBalance(username, amount) {
    let balance = await this.getUserBalance(username);
    console.log(typeof balance);
    balance += amount;
    this.putUserBalance(username, balance);
  }
}

module.exports = Game;
