import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index.js";
import session from "express-session";
import MongoStore from "connect-mongo";
// fire up the express app
const app = express();

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
