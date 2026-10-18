import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    getAllProjects,
    getAllProjectById,
    createAllProject,
    updateAllProject,
    deleteAllProject,
} from '../controllers/allProjectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getAllProjectById);
router.post('/', protect, createAllProject);
router.put('/:id', protect, updateAllProject);
router.delete('/:id', protect, deleteAllProject);

export default router;
