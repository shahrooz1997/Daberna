const express = require("express");
const fs = require("fs");
const loaders = require("./loaders");
const config = require("./config");

const app = express();

function startServer() {
  const app = express();
  loaders({ app });

  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

// const server = https.createServer(app);
// const server_port = process.env.SERVER_PORT || 3600;
// server.listen(server_port, () => {
//   console.log(`Server is up and listening on port ${server_port}`);
// });

startServer();
