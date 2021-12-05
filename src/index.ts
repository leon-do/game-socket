import { WebSocket } from "ws";
const PORT = parseInt(process.env.PORT!) || 3000;
const wss = new WebSocket.Server({ port: PORT });

wss.on("connection", function connection(ws: WebSocket, req) {
  // g. Server Socket: recieves message
  ws.on("message", (message: Buffer) => {
    // only allow wallet website to send message
    if (req.headers.origin !== "http://localhost:8000") return ws.close();
    // https://github.com/websockets/ws#server-broadcast
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        // h. Server Socket: emits message
        client.send(message.toString());
      }
    });
  });
});

wss.on("listening", () => {
  console.log(PORT);
});
