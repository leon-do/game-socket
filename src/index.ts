import { WebSocket } from "ws";

const wss = new WebSocket.Server({ port: 3000 });

// f. Server Socket: recieves message
wss.on("connection", function connection(ws) {
  ws.on("message", (message) => {
    // g. Server Socket: emits message
    ws.send(JSON.stringify(message.toString()));
  });
});

wss.on("listening", () => {
  console.log(3000);
});
