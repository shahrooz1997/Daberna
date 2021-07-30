const shuffle = require("./utils/shuffle");
const uid = require("./utils/uid");

class Game {
  constructor() {
    this.id = uid(5);
    this.nums = shuffle(0, 90);
    this.drawnIndex = 0;
    this.users = []; // An array of user ids participating in this game
  }

  addUser(userid) {
    const userindex = this.users.indexOf(userid);
    if (userindex === -1) {
      this.users.push(userid);
    }
  }

  removeUser(userid) {
    const userindex = this.users.indexOf(userid);
    if (userindex !== -1) {
      this.users.splice(userindex, 1);
    }
  }

  draw() {
    return this.nums[this.drawnIndex++];
  }

  checkWin(cardNums) {
    for (let i = this.drawnIndex; i < this.nums.length; i++) {
      if (cardNums.indexOf(this.nums[i]) != -1) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Game;
