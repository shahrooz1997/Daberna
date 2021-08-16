const expressWs = require("express-ws");

module.exports = ({ app, server }) => {
  expressWs(app, server);
  app.ws("/echo", (ws, req) => {
    console.log("echo WebSocket connected");
    ws.on("message", (msg) => {
      ws.send(msg);
    });
    ws.on("close", () => {
      console.log("echo WebSocket was closed");
    });
  });
};
