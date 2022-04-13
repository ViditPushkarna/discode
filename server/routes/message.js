import express from "express";
import passport from "passport";
import "../config/passport.js";
import {
  createMessage,
  fetchAllMess,
} from "../controllers/message_controller.js";
const router = express.Router();
console.log("Message Router loaded");

router.post(
  "/createMessage",
  passport.authenticate("jwt", { session: false }),
  createMessage
);
router.post(
  "/fetchAll",
  passport.authenticate("jwt", { session: false }),
  fetchAllMess
);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
