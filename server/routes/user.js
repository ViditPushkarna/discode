import express from "express";
import { createUser, home, userInfo } from "../controllers/user_controller.js";
const router = express.Router();
console.log("Server Router loaded");

router.get("/", home);
router.post("/createUser", createUser);
router.post("/userInfo", userInfo);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
