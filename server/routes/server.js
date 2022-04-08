import express from "express";
const router = express.Router();
import {
  home,
  createServer,
  deleteServer,
  makeAdmin,
  removeAdmin,
  addMember,
  kickMember,
} from "../controllers/server_controller.js";
console.log("Server Router loaded");

router.get("/", home);
router.post("/createServer", createServer);
router.post("/deleteServer", deleteServer);
router.post("/makeAdmin", makeAdmin);
router.post("/removeAdmin", removeAdmin);
router.post("/addMember", addMember);
router.post("/kickMember", kickMember);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
