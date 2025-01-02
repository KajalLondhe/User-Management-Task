import { useEffect, useState } from 'react';
import '../CSS/ProjectList.css';  // Ensure the path is correct
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (err: any) {
        setError('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:5000/api/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Project deleted successfully');
      setProjects(projects.filter((project) => project._id !== projectId)); // Remove deleted project from state
    } catch (err: any) {
      setError('Failed to delete project');
    }
  };

  const handleUpdate = (projectId: string) => {
    navigate(`/update-project/${projectId}`); 
  };

  return (
    <div>
      <h2>Your Projects</h2>
      {error && <p>{error}</p>}
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <div>
                <strong>{project.name}</strong> - {project.description}
              </div>
              <div>
                <button onClick={() => handleUpdate(project._id)}>Update</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-projects">No projects found</p>
      )}
    </div>
  );
};

export default ProjectList;
