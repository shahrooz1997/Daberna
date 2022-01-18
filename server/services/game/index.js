const Game = require("./game");
const db = require("../../db");

// Todo: persist games
games = {};
availableGamesSubscribers = {};

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

async function getUserInfo(username) {
  const result = await db.query(
    "SELECT firstname, lastname FROM users where username = $1",
    [username]
  );
  if (result.rows.length !== 1) {
    throw new Error(`User with username ${username} does not exist`);
  }
  return result.rows[0];
}

async function createGame(session, betPerCard = 1) {
  if (session.gameId) {
    removeUserFromGame(session);
  }
  const game = new Game(betPerCard, await getUserInfo(session.username));
  await game.fillCards();
  addGame(game);
  availableGames(null, null, false);
  game.addUser(session.username);

  session.gameId = game.id;
  session.gameOwner = true;

  console.log(`game with id ${game.id} created`);

  return {
    gameId: session.gameId,
  };
}

async function hasWon(session) {
  const game = games[session.gameId];
  game.claimWin(session.username, session.cardId);
  return {
    status: "success",
  };
}

async function getAvailableCards(session) {
  return {
    cards: await games[session.gameId].getAvailableCards(),
  };
}

function joinGame(session, gameId) {
  gameId = gameId.toLowerCase();
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

function selectCard(session, cardId) {
  const game = games[session.gameId];
  session.cardId = cardId;
  game.selectCard(session.username, cardId);
  return {
    selected: true,
  };
}

function allUserSelectedCard(session) {
  const game = games[session.gameId];
  return game.allUserSelectedCard();
}

function availableCards(session, ws) {
  const game = games[session.gameId];
  game.subscribeAvailableCards(session.username, ws);
}

function availableCardsStop(session, ws) {
  const game = games[session.gameId];
  game.unsubscribeAvailableCards(session.username);
}

async function getAllCards(session, ws) {
  const game = games[session.gameId];
  if (game) {
    const cards = await game.getAllCards();
    ws.send(JSON.stringify({ type: "allCards", payload: { cards } }));
  }
}

function availableGames(session, ws, newConnection = true) {
  if (newConnection) {
    availableGamesSubscribers[session.username] = ws;
  }
  ret = [];
  console.log("availableGames called");
  for (const game in games) {
    console.log(games[game]);
    if (games[game].state === "created") {
      ret.push({
        gameid: games[game].id,
        owner: games[game].owner.firstname + " " + games[game].owner.lastname,
        bet: games[game].gamefee,
      });
    }
  }
  if (newConnection) {
    availableGamesSubscribers[session.username].send(
      JSON.stringify({ type: "availableGames", payload: { games: ret } })
    );
  } else {
    for (const user in availableGamesSubscribers) {
      availableGamesSubscribers[user].send(
        JSON.stringify({ type: "availableGames", payload: { games: ret } })
      );
    }
  }
}

function availableGamesStop(session, ws) {
  delete availableGamesSubscribers[session.username];
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
  selectCard,
  allUserSelectedCard,
  availableCards,
  availableCardsStop,
  getAllCards,
  availableGames,
  availableGamesStop,
};
