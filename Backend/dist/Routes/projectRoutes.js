"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../Controlleres/projectController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Create a project
router.post('/create', authMiddleware_1.protect, projectController_1.createProject);
// Update a project
router.put('/update/:id', authMiddleware_1.protect, projectController_1.updateProject);
router.get('/getbyid/:id', authMiddleware_1.protect, projectController_1.getProjectById);
// Delete a project
router.delete('/:id', authMiddleware_1.protect, projectController_1.deleteProject);
router.get('/', authMiddleware_1.protect, projectController_1.getProjectsByUser);
exports.default = router;
