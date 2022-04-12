import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import http from "http";
import { Server } from "socket.io";

// fire up the express app
const app = express();

// chatting
const chatServer = http.createServer(app);
import { chatSockets } from "./config/chat_sockets.js";
const chat_sockets = chatSockets(chatServer);
chatServer.listen(4000, () => {
  console.log(`Chat server running on port : ${4000}`);
});

const io = new Server(chatServer, {
  cors: {
    origin: ["*"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected : ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected : ${socket.id}`);
  });
});

// connect to database
import db from "./config/mongoose.js";
import passport from "passport";
// console.log(db);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

const PORT = 5000;

app.use(passport.initialize());

// use express router
app.use("/", routes);

app.listen(PORT, function (err) {
  if (err) {
    console.log("oh no no no no no");
    return;
  }
  console.log("hey there i am using discode on port : ", PORT);
});
