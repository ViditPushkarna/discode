import express from "express";
import passport from "passport";
import "../config/passport.js";
import { createChannel } from "../controllers/channel_controller.js";
import { home } from "../controllers/home_controller.js";
const router = express.Router();
console.log("Channel Router loaded");

router.get("/", home);
router.post(
  "/createChannel",
  passport.authenticate("jwt", { session: false }),
  createChannel
);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
