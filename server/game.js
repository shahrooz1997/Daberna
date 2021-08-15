const shuffle = require("./utils/shuffle");
const uid = require("./utils/uid");

class Game {
  constructor() {
    this.id = uid(5);
    this.nums = shuffle(1, 90);
    this.drawnIndex = 0;
    this.users = []; // An array of user ids participating in this game
  }

  addUser(username) {
    const userindex = this.users.indexOf(username);
    if (userindex === -1) {
      this.users.push(username);
    }
  }

  removeUser(username) {
    const userindex = this.users.indexOf(username);
    if (userindex !== -1) {
      this.users.splice(userindex, 1);
    }
  }

  draw() {
    if (this.drawnIndex >= this.nums.length) {
      return -1;
    }
    return this.nums[this.drawnIndex++];
  }

  checkWin(cardNums) {
    console.log("BBBBBB");
    console.log(cardNums);
    for (let i = this.drawnIndex; i < this.nums.length; i++) {
      if (cardNums.indexOf(this.nums[i]) != -1) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Game;
