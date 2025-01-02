import express from 'express';
import { getUsers, deleteUser } from '../Controlleres/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

// Fetch all users
router.get('/', protect, admin, getUsers);

// Delete a user by ID
router.delete('/:id', protect, admin, deleteUser);

export default router;
