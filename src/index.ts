import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import net from "net";
const PORT = parseInt(process.env.PORT!) || 3000;

// each user has a unique id. This links wssWallet to wssApp
interface User {
  [uid: string]: WebSocket;
}

const server = createServer();
const wssApp = new WebSocketServer({ noServer: true });
const wssWallet = new WebSocketServer({ noServer: true });

// store users to send correct wallet message to correct app 
const users: User = {};

// https://github.com/websockets/ws#multiple-servers-sharing-a-single-https-server
server.on("upgrade", (request, socket, head) => {
  if (request.url === "/app") {
    // https://tz.liuqiufeng.com/DefinitelyTyped/DefinitelyTyped/discussions/56247#discussioncomment-1438729
    wssApp.handleUpgrade(
      request,
      socket as net.Socket,
      head,
      function done(ws) {
        wssApp.emit("connection", ws, request);
      }
    );
  } else if (request.url === "/wallet") {
    wssWallet.handleUpgrade(
      request,
      socket as net.Socket,
      head,
      function done(ws) {
        wssWallet.emit("connection", ws, request);
      }
    );
  } else {
    socket.destroy();
  }
});

wssApp.on("connection", function connection(wsApp: WebSocket) {
  // Users uid scoped for onMessage and onClose
  let uid: string;

  wsApp.on("message", (message: string) => {
    // update scoped user uid
    uid = message;
    // save user
    users[uid] = wsApp;
  });

  wsApp.on("close", () => {
    delete users[uid];
  });

  wsApp.on("error", (error: Error) => {
    console.log(error.message);
    delete users[uid];
  });
});

wssWallet.on("connection", function connection(wsWallet: WebSocket) {
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
      wsWallet.close();
    }
  });

  wsWallet.on("close", () => {
    delete users[uid];
  });

  wsWallet.on("error", (error: Error) => {
    console.error(error.message);
    delete users[uid];
  });
});

server.listen(PORT, () => console.error(`Listening on ${PORT}`));
