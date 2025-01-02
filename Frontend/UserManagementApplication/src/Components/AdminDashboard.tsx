import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/AdminDashboard.css';  // Import the CSS file for styling

const AdminDashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const projectResponse = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(projectResponse.data);
      } catch (err: any) {
        setError('Error fetching projects data');
      }
    };

    fetchAdminData();
  }, []);

  // Handle project deletion
  const handleDeleteProject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err: any) {
      setError('Error deleting project');
    }
  };

  // Navigate to create project page
  const handleCreateProject = () => {
    navigate('/create-project');
  };

  // Navigate to update project page
  const handleUpdateProject = (id: string) => {
    navigate(`/update-project/${id}`);
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="buttons-container">
        <button onClick={handleCreateProject} className="create-project-button">Create Project</button>
        <button onClick={() => navigate('/manage-users')} className="manage-users-button">Manage Users</button>
      </div>

      <h3>Projects</h3>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>
                  <button onClick={() => handleUpdateProject(project._id)} className="update-project-button">
                    Update Project
                  </button>
                  <button onClick={() => handleDeleteProject(project._id)} className="delete-project-button">
                    Delete Project
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
