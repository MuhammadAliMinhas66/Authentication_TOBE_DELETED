import express from "express";
import { getAllGames, createGame } from "../controllers/game.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // Token verify krne k liye
import { checkRole } from "../middlewares/roleMiddleware.js"; // Role check krne k liye

const router = express.Router();

// GET route - Sab log games dekh saktey hn (token verify hona chahiye)
router.get("/", verifyToken, getAllGames);

// POST route - Sirf admin aur moderator game create kr saktey hn
router.post("/", verifyToken, checkRole('admin', 'moderator'), createGame);

export default router;