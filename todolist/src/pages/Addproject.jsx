import React, { useEffect, useState } from 'react';
import { addProject, getProject, deleteProject, updateProject } from '../hook/ProjectCrud';
import { deleteTask } from '../hook/TaskCrud';
import { useNavigate } from 'react-router-dom';
import ProjectUI from '../components/viewTaskUI/ProjectUI.JSX';

const AddProject = ({ onProjectSelected, onProjectCreated }) => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);

  useEffect(() => {
    getProject().then(setProjects);
  }, []);

 
  const handleAddOrUpdate = async () => {
    if (!projectName.trim()) return;

    if (editProjectId) {
      await updateProject({ id: editProjectId, name: projectName });

      setProjects(prev =>
        prev.map(p =>
          p.id === editProjectId ? { ...p, name: projectName } : p
        )
      );
    } else {
      const result = await addProject({ name: projectName, createdAt: new Date() });
      setProjects(prev => [...prev, result]);

      if (onProjectCreated) onProjectCreated(result);
    }

    setProjectName('');
    setEditProjectId(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleEdit = (proj) => {
    setProjectName(proj.name);
    setEditProjectId(proj.id);
    setShowForm(true);
  };

  const handleProjectTask = (id, name) => {
    if (onProjectSelected) onProjectSelected(id, name);
    else navigate(`/projects/${id}`);
  };

  return (
    <ProjectUI
      projectName={projectName}
      setProjectName={setProjectName}
      projects={projects}
      showForm={showForm}
      setShowForm={setShowForm}
      editProjectId={editProjectId}
      onhandleAddProject={handleAddOrUpdate}
      onhandleProjectTask={handleProjectTask}
      onhandleEdit={handleEdit}
      onhandleDelete={handleDelete}
    />
  );
};

export default AddProject;

