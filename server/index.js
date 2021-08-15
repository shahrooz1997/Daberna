const cluster = require("cluster");
const os = require("os");
const process = require("process");
const runServer = require("./app");

const numCPUs = os.cpus().length;

// Todo: The request from the same user must go to the same child.

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  runServer();
  console.log(`Worker ${process.pid} started`);
}
