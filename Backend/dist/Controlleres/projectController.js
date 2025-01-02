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
exports.getProjectsByUser = exports.deleteProject = exports.getProjectById = exports.updateProject = exports.createProject = void 0;
const Project_1 = __importDefault(require("../Model/Project"));
// Create Project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const project = new Project_1.default({
            name,
            description,
            user: req.user.id, // Use user ID from token
        });
        const savedProject = yield project.save();
        res.status(201).json(savedProject);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create project', error });
    }
});
exports.createProject = createProject;
// Update Project
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const project = yield Project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Check if the authenticated user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this project' });
        }
        project.name = name || project.name;
        project.description = description || project.description;
        const updatedProject = yield project.save();
        res.status(200).json(updatedProject);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update project', error });
    }
});
exports.updateProject = updateProject;
// Get Project by ID
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const project = yield Project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Check if the authenticated user owns the project or if they are an admin
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view this project' });
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch project', error });
    }
});
exports.getProjectById = getProjectById;
// Delete Project
// Delete Project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const project = yield Project_1.default.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Check if the authenticated user owns the project
        if (project.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this project' });
        }
        // Use deleteOne to remove the project
        yield Project_1.default.deleteOne({ _id: id });
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete project', error });
    }
});
exports.deleteProject = deleteProject;
// Get all projects of the authenticated user
const getProjectsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all projects created by the authenticated user
        const projects = yield Project_1.default.find({ user: req.user.id });
        if (!projects) {
            return res.status(404).json({ message: 'No projects found for this user' });
        }
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error while fetching projects', error });
    }
});
exports.getProjectsByUser = getProjectsByUser;
// router.get('/', authenticateToken, async (req: Request, res: Response) => {
//     try {
//       const projects = await Project.find({
//         $or: [
//           { createdBy: req.user._id }, // User can see their own projects
//           { createdBy: { $in: req.user.role === 'admin' ? [req.user._id] : [] } }, // Admin can see all projects
//         ],
//       });
//       res.status(200).json(projects);
//     } catch (err) {
//       res.status(400).json({ message: 'Error fetching projects' });
//     }
//   });
