import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

interface Transaction {
  user: string;
  receipt: string;
}

// set up server
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

// listen to connection
io.on("connection", (socket) => {
  // emit ok every interval
  setInterval(() => {
    socket.emit("healthcheck", "OK");
  }, 3000);

  // gets info from wallet (index.html)
  socket.on("transaction", (transaction: Transaction) => {
    const { user, receipt} = transaction;
    // send transaction receipt to id
    socket.emit(user, receipt);
  });
});

// start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(PORT);
});
