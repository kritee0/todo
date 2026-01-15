import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../hook/TaskCrud";
import AddTaskForm from "./Addtask";
import { initDB } from "../database/db";
import TaskList from "../components/viewTaskUI/taskUi/TaskList";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const[showConform,setShowConform]=useState()
  const[taskDelete,setTaskDelete]=useState()

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await initDB();
        const allTasks = await getTasks();
        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);


  const handleToggle = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };


  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

 
  const handleEditSave = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
  };

  return (
    <>
      
      <TaskList
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={setEditingTask}
        editingTask={editingTask}
      />

  
      {editingTask && (
        <AddTaskForm
          key={editingTask.id} 
          initialData={editingTask}
          onTaskSaved={handleEditSave}
        />
      )}
    </>
  );
};

export default ViewTasks;
