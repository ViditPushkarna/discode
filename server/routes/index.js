import express from "express";
import { home } from "../controllers/home_controller.js";
import server from "./server.js";
import channel from "./channel.js";
import message from "./message.js";
import user from "./user.js";
const router = express.Router();
console.log("Router loaded");

router.get("/", home);
router.use("/server", server);
router.use("/channel", channel);
router.use("/user", user);
router.use("/message", message);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
