import { WebSocket } from "ws";

const wssGame = new WebSocket.Server({ port: 3000 });
const wssWallet = new WebSocket.Server({ port: 3001 });

// gets msg from wallet and sends to game
const websockets = {} as { [key: string]: WebSocket };

// c. Server Socket: waits for response
wssGame.on("connection", (ws: WebSocket) => {
  ws.on("message", (address: string) => {
    websockets[address.toString()] = ws;
    ws.on("close", () => {
      delete websockets[address];
    });
  });
});

// g. Server Socket: recieves message from wallet
wssWallet.on("connection", (ws) => {
  ws.on("message", (message: string) => {
    const { address, receipt } = JSON.parse(message.toString());
    // h. Server Socket: emits message
    websockets[address].send(receipt);
    ws.on("close", () => {
      delete websockets[address];
    });
  });
});

wssWallet.on("listening", () => {
  console.log(3000);
});

wssGame.on("listening", () => {
  console.log(3001);
});
