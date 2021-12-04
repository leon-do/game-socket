import { WebSocket } from "ws";

const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", function connection(ws: WebSocket, req) {
  // only allow wallet website to send message
  if (req.headers.origin !== "http://localhost:8000") return ws.close();

  // f. Server Socket: recieves message
  ws.on("message", (message: Buffer) => {
    // https://github.com/websockets/ws#server-broadcast
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        // g. Server Socket: emits message
        client.send(message.toString());
      }
    });
  });
});

wss.on("listening", () => {
  console.log(3000);
});
