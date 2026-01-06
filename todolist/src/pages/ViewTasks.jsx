import React, { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../hook/TaskCrud";
import AddTaskForm from "./Addtask";
import { initDB } from "../database/db";
import TaskList from "../components/viewTaskUI/TaskList";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await initDB();
        const allTasks = await getTasks();
        console.log(allTasks);

        //setTasks(allTasks.filter(task => task.projectId === projectId));
        setTasks(allTasks);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);

  const handleToggle = async (todo) => {
    const updated = { ...todo, completed: !todo.completed };
    await updateTask(updated);
    setTasks((prev) =>
      prev.map((task) => (task.id === todo.id ? updated : task))
    );
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEditSave = async (id, newData) => {
    const updatedTask = { id, ...newData };
    await updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  return (
    <>
    <TaskList
    tasks={filteredTasks}
    
    filter={filter}
    setFilter={setFilter}
    // openDetails={openDetails}
    // setOpenDetails={setOpenDetails}
    onToggle={handleToggle}
    onDelete={handleDelete}
    onEdit={setEditingTask}





    />
      {editingTask && (
        <AddTaskForm
          //  projectId={projectId}
          initialData={editingTask}
          onTaskAdded={(data) => handleEditSave(editingTask.id, data)}
        />
      )}
    </>
  );
};

export default ViewTasks;
