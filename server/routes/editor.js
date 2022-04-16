import express from "express";
import passport from "passport";
import "../config/passport.js";
import {
  createEditor,
  deleteEditor,
  fetchData,
} from "../controllers/editor_controller.js";
import { home } from "../controllers/home_controller.js";
const router = express.Router();
console.log("Editor Router loaded");

router.get("/", home);
router.post(
  "/createEditor",
  passport.authenticate("jwt", { session: false }),
  createEditor
);
router.post(
  "/fetchData",
  passport.authenticate("jwt", { session: false }),
  fetchData
);
router.post(
  "/deleteEditor",
  passport.authenticate("jwt", { session: false }),
  deleteEditor
);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
