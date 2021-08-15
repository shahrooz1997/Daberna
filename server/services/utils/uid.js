const random = require("random");

const uid = (len) => {
  const ret = [];
  const charSet = "abcdefghijklmnpqrstuvwxyz0123456789";
  //"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < len; i++) {
    ret.push(charSet[random.int(0, charSet.length - 1)]);
  }

  return ret.join("");
};

module.exports = uid;
