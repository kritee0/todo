import { useEffect, useRef, useState } from "react";
import { getTasks, updateTask, deleteTask } from "./TaskCrud";
import { initDB } from "../database/db";
import { useLocation } from "react-router-dom";

export const useTasksHook = (projectId = null) => {
  const ref = useRef(null);
  const location = useLocation();

  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(false);
  const [filter, setFilter] = useState("pending");
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskDelete, setTaskDelete] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilter(params.get("filter") || "pending");
  }, [location.search]);

  useEffect(() => {
    const fetchTasks = async () => {
      await initDB();
      let allTasks = await getTasks();

      // ✅ PROJECT FILTER
      if (projectId) {
        allTasks = allTasks.filter(
          task => String(task.projectId) === String(projectId)
        );
      }

      setTasks(allTasks);
    };

    fetchTasks();
  }, [projectId]);

  const handleToggle = async (task) => {
    const completed = !task.completed;
    const status = completed ? "completed" : task.status;
    const updatedTask = { ...task, completed, status };

    await updateTask(updatedTask);
    setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
  };

  const requestDelete = (task) => {
    setTaskDelete(task);
    setShowConfirm(true);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
    setShowConfirm(false);
    setTaskDelete(null);
  };

  const handleEditSave = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const handleStatusChangeInParent = (updatedTask) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  return {
    ref,
    tasks,
    filter,
    setFilter,
    editingTask,
    setEditingTask,
    showConfirm,
    taskDelete,
    handleToggle,
    requestDelete,
    handleDelete,
    handleEditSave,
    handleStatusChangeInParent,
  };
};
