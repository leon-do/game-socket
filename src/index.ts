import { WebSocket } from "ws";
// game connects to this port
const PORT_GAME = parseInt(process.env.PORT!) || 3000;
// wallet connects to this port
const PORT_WALLET = parseInt(process.env.PORT!) || 3001;

// each user has a unique id. This links wssWallet to wssGame
interface User {
  [uid: string]: WebSocket;
}

// game connects to this server
const wssGame = new WebSocket.Server({ port: PORT_GAME });
// wallet connects to this server
const wssWallet = new WebSocket.Server({ port: PORT_WALLET });

// store users to send correct wallet message to correct game
const users: User = {};

// when game connects
wssGame.on("connection", (wsGame: WebSocket, request: Request) => {
  // Users uid scoped for onMessage and onClose
  let uid: string;

  wsGame.on("message", (message: string) => {
    // update scoped user uid
    uid = message;
    // save user
    users[uid] = wsGame;
  });

  wsGame.on("close", () => {
    delete users[uid];
  });

  wsGame.on("error", (error: Error) => {
    console.log(error.message);
    delete users[uid];
  });
});

wssWallet.on("connection", (wsWallet: WebSocket) => {
  // Users uid scoped for onMessage and onClose
  let uid: string;

  wsWallet.on("message", (message: string) => {
    // update scoped user uid
    uid = message.toString().split("-")[0];
    const response = message.toString().split("-")[1];
    if (users[uid]) {
      // send response to correct user
      users[uid].send(response);
      // close connection
      users[uid].close();
    }
  });

  wsWallet.on("close", () => {
    delete users[uid];
  });

  wsWallet.on("error", (error: Error) => {
    console.log(error.message);
    delete users[uid];
  });
});

wssGame.on("listening", () => console.log("Game on " + PORT_GAME));
wssWallet.on("listening", () => console.log("Wallet on " + PORT_WALLET));
