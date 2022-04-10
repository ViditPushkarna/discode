import express from "express";
import { home } from "../controllers/home_controller.js";
const router = express.Router();
console.log("Channel Router loaded");

router.get("/", home);
// for any further routes, access from here
// router.use('/routerName', require('./route'));

export default router;
