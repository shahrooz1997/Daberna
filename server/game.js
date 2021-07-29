import shuffle from "./utils/shuffle";

class Game {
  constructor() {
    this.nums = shuffle(0, 90);
    this.drawnIndex = 0;
    this.users = []; // An array of user ids participating in this game
  }

  addUser(userid) {
    this.users.push(userid);
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
