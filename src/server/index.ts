import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import AIService from "./ai.service";
import SocketEvents from "../etc/socket-events";
import { TextSuggestionStreamParams, TranslateTextParams } from "@/etc/dto";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    const aiService = AIService.getInstance();

    socket.on(SocketEvents.SEND_THE_AMBULANCE, (data: TextSuggestionStreamParams) => {
      aiService.createTextSuggestionStream(data, (chunk) => {
        socket.emit(SocketEvents.CHUNK_IS_COMING, chunk);
      }, () => {
        socket.emit(SocketEvents.HET_CUU);
      });
    });

    socket.on(SocketEvents.TRANSLATE_TEXT, (data: TranslateTextParams) => {
      aiService.createTranslateTextStream(data, (chunk) => {
        socket.emit(SocketEvents.CHUNK_IS_COMING, chunk);
      }, () => {
        socket.emit(SocketEvents.HET_CUU);
      });
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});