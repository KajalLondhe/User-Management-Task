import express from 'express';
import { register, login } from '../Controlleres/authController'; // Import controllers
import { validateSignup, validateLogin } from '../middleware/authMiddleware'; // Optional validation middleware

const router = express.Router();

router.post('/register', validateSignup, register);

router.post('/login', validateLogin, login);

export default router;
