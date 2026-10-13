import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { submitContact, getMessages, getMessageById, toggleReadStatus, deleteMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", submitContact);
router.get("/contact/:id", protect, getMessageById)
router.get("/contact", protect, getMessages);
router.put("/contact/:id", protect, toggleReadStatus);
router.delete("/contact/:id", protect, deleteMessage);

export default router;