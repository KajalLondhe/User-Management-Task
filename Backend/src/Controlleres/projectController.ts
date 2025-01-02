import { Request, Response } from 'express';
import Project from '../Model/Project';

// Extend the Request interface to include the user object
interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };  // Both 'id' and 'role' are required here
}

// Create Project
export const createProject = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  const { name, description } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const project = new Project({
      name,
      description,
      user: req.user.id, // Use user ID from token
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error });
  }
};

// Update Project
export const updateProject = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the authenticated user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    project.name = name || project.name;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error });
  }
};


// Get Project by ID
export const getProjectById = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
    const { id } = req.params;
  
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const project = await Project.findById(id);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Check if the authenticated user owns the project or if they are an admin
      if (project.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to view this project' });
      }
  
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch project', error });
    }
  };
  

// Delete Project
// Delete Project
export const deleteProject = async (req: AuthenticatedRequest, res: Response):Promise<any> => {
    const { id } = req.params;
  
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const project = await Project.findById(id);
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Check if the authenticated user owns the project
      if (project.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to delete this project' });
      }
  
      // Use deleteOne to remove the project
      await Project.deleteOne({ _id: id });
  
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete project', error });
    }
  };
  

  // Get all projects of the authenticated user

export const getProjectsByUser = async (req: any, res: Response):Promise<any> => {
  try {
    // Fetch all projects created by the authenticated user
    const projects = await Project.find({ user: req.user.id });

    if (!projects) {
      return res.status(404).json({ message: 'No projects found for this user' });
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching projects', error });
  }
};

