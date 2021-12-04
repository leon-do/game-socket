import { WebSocket } from "ws";

const wss = new WebSocket.Server({ port: 3000 });

// f. Server Socket: recieves message
wss.on("connection", function connection(ws) {
  ws.on("message", (message) => {
    ws.send(message.toString());
  });
});

wss.on("listening", () => {
  console.log(3000);
});
