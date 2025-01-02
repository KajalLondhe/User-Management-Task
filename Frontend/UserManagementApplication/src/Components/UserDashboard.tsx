import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserDashboard: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (err: any) {
        setError('Error fetching projects');
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
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

  const handleCreateProject = () => {
    navigate('/create-project'); };

  const handleUpdateProject = (id: string) => {
    navigate(`/updateuserproject/${id}`);
  };

  return (
    <div>
      
      <h2>Your Projects</h2>
      {error && <p>{error}</p>}
      <button onClick={handleCreateProject}>Create Project</button>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            {project.name} - {project.description}
            <button onClick={() => handleUpdateProject(project._id)} className="update-project-button">
                    Update Project
                  </button>
            <button onClick={() => handleDelete(project._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
