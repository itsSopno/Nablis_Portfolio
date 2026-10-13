import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { createContact, getContacts, getContactById, updateContact, deleteContact } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact", createContact);
router.get("/contact", protect, admin, getContacts);
router.get("/contact/:id", protect, admin, getContactById);
router.put("/contact/:id", protect, admin, updateContact);
router.delete("/contact/:id", protect, admin, deleteContact);

export default router;