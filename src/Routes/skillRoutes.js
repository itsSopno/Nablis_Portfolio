import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../controllers/skillController.js";

const router = express.Router();

router.get("/skill", getSkills);
router.post("/skill", protect, admin, createSkill);
router.put("/skill/:id", protect, admin, updateSkill);
router.delete("/skill/:id", protect, admin, deleteSkill);

export default router;
