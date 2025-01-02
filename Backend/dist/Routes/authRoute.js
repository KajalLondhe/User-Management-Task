"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../Controlleres/authController"); // Import controllers
const authMiddleware_1 = require("../middleware/authMiddleware"); // Optional validation middleware
const router = express_1.default.Router();
// POST route for user registration
router.post('/register', authMiddleware_1.validateSignup, authController_1.register);
// POST route for user login
router.post('/login', authMiddleware_1.validateLogin, authController_1.login);
exports.default = router;
