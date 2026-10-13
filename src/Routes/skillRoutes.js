import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getSkills, createSkill, updateSkill, deleteSkill } from "../controllers/skillController.js";

const router = express.Router();

router.get("/skill", getSkills);
router.post("/skill", protect, createSkill);
router.put("/skill/:id", protect, updateSkill);
router.delete("/skill/:id", protect, deleteSkill);

export default router;
