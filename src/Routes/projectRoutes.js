import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/project", getProjects);
router.post("/project", protect, createProject);
router.put("/project/:id", protect, updateProject);
router.delete("/project/:id", protect, deleteProject);

export default router;