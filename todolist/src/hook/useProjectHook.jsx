import { useState, useEffect } from "react";
import { getProject, addProject, deleteProject, updateProject } from "./ProjectCrud";
import { getTaskByProjectId } from "./TaskCrud";
import { useNavigate } from "react-router-dom";

export const useProjectHook = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);


  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const data = await getProject();
    setProjects(data);
  };


  const handleAddOrUpdate = async () => {
    if (!projectName.trim()) return;

    if (editProjectId) {
      await updateProject({ id: editProjectId, name: projectName });
    } else {
      await addProject({ name: projectName });
    }

    await fetchProjects();
    setProjectName("");
    setEditProjectId(null);
    setShowForm(false);
  };


  const handleEdit = (project) => {
    setProjectName(project.name);
    setEditProjectId(project.id);
    setShowForm(true);
  };

 const handleDelete = async (id) => {
  try {
    
    const tasks = await getTaskByProjectId(id);

 
    for (const task of tasks) {
      await deleteTask(task.id);
    }

    
    await deleteProject(id);

    setProjects((prev) => prev.filter((p) => p.id !== id));
  } catch (error) {
    console.error("Error deleting project and its tasks:", error);
  }
};

const handleProjectSelect = (id, name) => {
  setSelectedProjectId(id);
  setSelectedProjectName(name);
  setShowInbox(false);
};

  return {
    projects,
    projectName,
    setProjectName,
    showForm,
    setShowForm,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
    handleProjectSelect,
  };
};
