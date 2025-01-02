"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = exports.validateLogin = exports.validateSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../Model/User"));
// Middleware to validate signup data
const validateSignup = (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required for registration.' });
    }
    // Add further validation logic (e.g., regex for email, password strength)
    next();
};
exports.validateSignup = validateSignup;
// Middleware to validate login data
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    // Proceed to the next middleware or controller
    next();
};
exports.validateLogin = validateLogin;
// Middleware to protect routes
const protect = (req, // Use AuthenticatedRequest from the imported file
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret');
        const user = yield User_1.default.findById(decoded.id).select('id role');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = { id: user.id, role: user.role }; // Attach user object
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
});
exports.protect = protect;
// Admin middleware to check if user has 'admin' role
const admin = (req, // Use AuthenticatedRequest from the imported file
res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};
exports.admin = admin;
