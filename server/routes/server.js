import express from "express";
import passport from "passport";
import "../config/passport.js";
const router = express.Router();
import {
  home,
  createServer,
  deleteServer,
  makeAdmin,
  removeAdmin,
  addMember,
  kickMember,
  serverInfo,
} from "../controllers/server_controller.js";
console.log("Server Router loaded");

router.get("/", home);
router.post(
  "/createServer",
  passport.authenticate("jwt", { session: false }),
  createServer
);
router.post(
  "/deleteServer",
  passport.authenticate("jwt", { session: false }),
  deleteServer
);
router.post("/makeAdmin", makeAdmin);
router.post("/removeAdmin", removeAdmin);
router.post(
  "/addMember",
  passport.authenticate("jwt", { session: false }),
  addMember
);
router.post(
  "/serverInfo",
  passport.authenticate("jwt", { session: false }),
  serverInfo
);
router.post("/kickMember", kickMember);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
