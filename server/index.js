import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import http from "http";
import { Server } from "socket.io";
import { iofunc } from "./config/sockets.js";

// fire up the express app
const app = express();

const PORT = 5000;

// chatting
const server = http.Server(app);
// import { chatSockets } from "./config/chat_sockets.js";

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

iofunc(io);

// connect to database
import db from "./config/mongoose.js";
import passport from "passport";
// console.log(db);

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());

app.use(passport.initialize());

// use express router
app.use("/", routes);



/* ----------------------------------- OpenTok ----------------------------------- */
import dotenv from 'dotenv'
dotenv.config()

import OpenTok from "opentok"
const OT = new OpenTok(process.env.KEY, process.env.SECRET)

const KEY = process.env.KEY
let voiceSession = {}

const getToken = session => {
  return OT.generateToken(session, {
      role: 'publisher',
      expireTime: (new Date().getTime() / 1000) + (0.5 * 24 * 60 * 60) // in 0.5 days
  })
}

app.get('/data', (req, res) => {
  const room = req.query.room
  if (voiceSession[room])
      res.json({
          session: voiceSession[room],
          key: KEY,
          token: getToken(voiceSession[room])
      })
  else
      OT.createSession({ mediaMode: "routed" }, (err, session) => {
          if (err)
              res.json({ error: true })
          else
              res.json({
                  session: (voiceSession[room] = session.sessionId),
                  key: KEY,
                  token: getToken(session.sessionId)
              })
      })
})

/* ----------------------------------- */



server.listen(PORT, function (err) {
  if (err) {
    console.log("oh no no no no no");
    return;
  }
  console.log("hey there i am using discode on port : ", PORT);
});
