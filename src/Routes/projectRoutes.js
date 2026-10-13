import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = express.Router();

router.get("/project", getProjects);
router.get("/project/:id", getProjectById);
router.post("/project", protect, admin, createProject);
router.put("/project/:id", protect, admin, updateProject);
router.delete("/project/:id", protect, admin, deleteProject);

export default router;