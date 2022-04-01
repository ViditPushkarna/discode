// require the library
import mongoose from "mongoose";
// const mongoose = require("mongoose");

// connect to database
const CONNECTION_URL =
  "mongodb+srv://baniaanamazi:madhav07@cluster0.eelpj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect("mongodb://localhost/discode_db"); // give any name to database

// acquire connection (to check if it is successful)
const db = mongoose.connection;

// if there's error
db.on("error", console.error.bind(console, "error connecting to db"));

// up and running then print message
db.once("open", function () {
  console.log("Successfully connected to database");
});
export default db;
