import express from "express";
import passport from "passport";
import "../config/passport.js";
import { createVoice } from "../controllers/voice_controller.js";
import { home } from "../controllers/home_controller.js";
const router = express.Router();
console.log("Voice Router loaded");

router.get("/", home);
router.post(
  "/createVoice",
  passport.authenticate("jwt", { session: false }),
  createVoice
);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
