const random = require("random");

const shuffle = (min, max) => {
  const array = [];

  for (let i = min; i <= max; i++) {
    array.push(i);
  }

  const ret = [];
  const arrLength = array.length;

  for (let i = 0; i < arrLength; i++) {
    const randIndex = random.int(0, array.length - 1);
    ret.push(array[randIndex]);
    array.splice(randIndex, 1);
  }
  return ret;
};

module.exports = shuffle;
