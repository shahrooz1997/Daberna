const express = require("express");
const fs = require("fs");
const https = require("https");

const app = express();

const server = https.createServer(app);
const server_port = process.env.SERVER_PORT || 3600;
server.listen(server_port, () => {
  console.log(`Server is up and listening on port ${server_port}`);
});
