import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../CSS/UpdateProject.css';  

const UpdateProject: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:5000/api/projects/getbyid/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { name, description } = response.data;
          setName(name);
          setDescription(description);
        } catch (err: any) {
          setError('Error fetching project details');
        }
      };
      fetchProject();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!id) {
        setError('Project ID is missing');
        return;
      }
      // Make a PUT request to update the project
      const response = await axios.put(
        `http://localhost:5000/api/projects/update/${id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Project updated successfully');
      navigate('/admin-dashboard');
    } catch (err: any) {
      setError('Error updating project');
    }
  };

  return (
    <div className="update-project-container">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit} className="update-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input-field"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateProject;
