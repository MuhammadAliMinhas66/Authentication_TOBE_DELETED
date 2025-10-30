import express from "express";
import { getAllGameUsers, createGameUser } from "../controllers/user.js";

const router = express.Router();
// user routes
router.get("/", getAllGameUsers);
router.post("/", createGameUser);



export default router;