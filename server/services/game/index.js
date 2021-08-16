const Game = require("./game");

// Todo: persist games
games = {};
function addGame(game) {
  games[game.id] = game;
}

function hasGame(session) {
  if (session.gameId) {
    return true;
  }
  return false;
}

function removeUserFromGame(session) {
  if (session.gameId) {
    if (!games[session.gameId]) {
      delete session.gameId;
      return;
      //   throw new Error(`Game with id ${session.gameId} does not exist`);
    }
    games[session.gameId].removeUser(session.username);
    if (games[session.gameId].users.length === 0) {
      games[session.gameId].destroy();
      delete games[session.gameId];
    }
    delete session.gameId;
  }
}

async function createGame(session) {
  if (session.gameId) {
    removeUserFromGame(session);
  }
  const game = new Game();
  await game.fillCards();
  addGame(game);
  game.addUser(session.username);

  session.gameId = game.id;
  session.gameOwner = true;

  return {
    gameId: session.gameId,
  };
}

function hasWon(session) {
  return {
    win: games[session.gameId].checkWin(),
  };
}

async function getAvailableCards(session) {
  return {
    cards: await games[session.gameId].getAvailableCards(),
  };
}

function joinGame(session, gameId) {
  if (session.gameId) {
    removeUserFromGame(session);
  }
  const game = games[gameId];
  if (!game) {
    return {
      joined: false,
    };
  }
  if (game.state !== "created") {
    return {
      joined: false,
    };
  }

  game.addUser(session.username);

  session.gameId = game.id;
  session.gameOwner = false;

  return {
    joined: true,
    gameId: session.gameId,
  };
}

function getUsernames(session, ws) {
  const game = games[session.gameId];

  game.usernameWs[session.username] = ws;

  return {
    users: game.users,
  };
}

function subscribeNumbers(session, ws) {
  const game = games[session.gameId];
  game.addNumberSubscribers(session.username, ws);
}

function startGame(session) {
  if (!session.gameOwner) {
    return {
      start: false,
    };
  }

  const game = games[session.gameId];
  game.start();
  return {
    start: true,
  };
}

function pauseGame(session) {
  if (!session.gameOwner) {
    return {
      pause: false,
    };
  }

  const game = games[session.gameId];
  game.pause();
  return {
    pause: true,
  };
}

module.exports = {
  createGame,
  joinGame,
  removeUserFromGame,
  hasWon,
  getAvailableCards,
  hasGame,
  getUsernames,
  subscribeNumbers,
  startGame,
  pauseGame,
};
