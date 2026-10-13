import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { login, getMe, changePassword } from "../controllers/userController.js";
const router = express.Router();

router.post("/login", login);
router.get("/me", protect, admin, getMe);

router.put("/change-password", protect, admin, changePassword);

export default router;
