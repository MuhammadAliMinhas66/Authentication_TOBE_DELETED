import express from "express";
import { getAllGameUsers, createGameUser } from "../controllers/user.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // Token verify krne k liye
import { checkRole } from "../middlewares/roleMiddleware.js"; // Role check krne k liye

const router = express.Router();

// GET route - Sirf admin sab users ko dekh sakta ha
router.get("/", verifyToken, checkRole('admin'), getAllGameUsers);

// POST route - Sirf admin naye users create kr sakta ha
router.post("/", verifyToken, checkRole('admin'), createGameUser);

export default router;