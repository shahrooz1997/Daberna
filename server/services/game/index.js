const Game = require("./game");

// Todo: persist games
games = {};
function addGame(game) {
  games[game.id] = game;
}

function removeUserFromGame(session) {
  if (session.gameId) {
    if (!games[session.gameId]) {
      throw new Error(`Game with id ${session.gameId} does not exist`);
    }
    games[session.gameId].removeUser(session.username);
    if (games[session.gameId].users.length === 0) {
      games[session.gameId].destory();
      delete games[session.gameId];
    }
    delete session.gameId;
  }
}

function createGame(session) {
  if (session.gameId) {
    removeUserFromGame(session);
  }
  const game = new Game();
  addGame(game);
  game.addUser(session.username);

  session.gameId = game.id;
  session.gameOwner = true;

  return {
    gameId: req.session.game.id,
  };
}

function hasWon(session) {
  return {
    win: games[session.gameId].checkWin(),
  };
}

function getAvailableCards(session) {
  return {
    cards: games[session.gameId].getAvailableCards,
  };
}

module.exports = {
  createGame,
  removeUserFromGame,
  hasWon,
  getAvailableCards,
};
