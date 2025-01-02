import express from 'express';
import {
  createProject,
  updateProject,
  deleteProject,
  getProjectsByUser,
  getProjectById,
 
} from '../Controlleres/projectController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// Create a project
router.post('/create', protect, createProject);

// Update a project
router.put('/update/:id', protect, updateProject);
router.get('/getbyid/:id', protect, getProjectById);
// Delete a project
router.delete('/:id', protect, deleteProject);

router.get('/', protect, getProjectsByUser);

export default router;
