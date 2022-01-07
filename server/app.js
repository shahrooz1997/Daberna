const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");
const loaders = require("./loaders");
const config = require("./config");

// const app = express();

function startServer() {
  const app = express();
  const server = http.createServer(app);
  // https
  // .createServer(
  //   {
  //     key: fs.readFileSync(config.certificatePath.key),
  //     cert: fs.readFileSync(config.certificatePath.cert),
  //   },
  //   function (req, res) {
  //     console.log("AAAA");
  //     res.writeHead(200);
  //     res.end("hello world\n");
  //   }
  // )
  // .listen(8000);
  // const server = https.createServer(
  //   {
  //     key: fs.readFileSync(config.certificatePath.key),
  //     cert: fs.readFileSync(config.certificatePath.cert),
  //   },
  //   app
  // );
  loaders({ app, server });

  server.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is up and listening on port ${config.port}`);
  });
}

// const server = https.createServer(app);
// const server_port = process.env.SERVER_PORT || 3600;
// server.listen(server_port, () => {
//   console.log(`Server is up and listening on port ${server_port}`);
// });

startServer();
