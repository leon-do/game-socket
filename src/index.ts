import { WebSocket } from "ws";

const wss = new WebSocket.Server({ port: 3000 });

interface Response {
  id: string;
  receipt: string;
}

// f. Server Socket: recieves message
wss.on("connection", function connection(ws) {
  ws.on("message", (message) => {
    const response: Response = JSON.parse(message.toString());
    // g. Server Socket: emits message
    ws.send(JSON.stringify(response));
  });
});

wss.on("listening", () => {
  console.log(3000);
});
