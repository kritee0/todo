import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initDB } from "../database/db";
import { getProjectById } from "./ProjectCrud";
import { getTaskByProjectId, updateTask, deleteTask } from "./TaskCrud";

export const useProjectTasksHook = () => {
  const { projectId } = useParams();
  const numericProjectId = Number(projectId);

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (!numericProjectId) return;

    const fetchData = async () => {
      await initDB();
      setProject(await getProjectById(numericProjectId));
      setTasks((await getTaskByProjectId(numericProjectId)) || []);
    };

    fetchData();
  }, [numericProjectId]);


  
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    project,
    tasks,             
    editingTask,
    setEditingTask,
   
    handleDelete,
  };
};
