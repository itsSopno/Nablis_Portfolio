import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { login, getMe, changePassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/change-password", protect, changePassword);

export default router;
