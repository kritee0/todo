import React, { useEffect, useState } from "react";
import {  useNavigate,useParams  } from "react-router-dom";
import { getProjectById } from "../hook/ProjectCrud";
import { getTaskByProjectId, updateTask, deleteTask } from "../hook/TaskCrud";
import { initDB } from "../database/db";
import AddTaskForm from "./Addtask";
import TaskList from "../components/viewTaskUI/taskUi/TaskList";
import { IoIosArrowBack } from "react-icons/io";
const Taskpages = () => {
  const navigate = useNavigate(); 
  const { projectId } = useParams();
  const numericProjectId = Number(projectId);

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    const fetchData = async () => {
      try {
        await initDB();
        const projectData = await getProjectById(numericProjectId);
        const tasksFromDb = await getTaskByProjectId(numericProjectId);

        setProject(projectData);
        setTasks(tasksFromDb || []);
      } catch (error) {
        console.log("Error fetching project/tasks:", error);
      }
    };

    fetchData();
  }, [numericProjectId]);

 
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
    const updatedTask = { id, ...newData, projectId: numericProjectId };
    await updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? updatedTask : task))
    );
    setEditingTask(null);
  };


  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  return (
 <div className="max-w-5xl mx-auto px-4 py-6">

  
  <div className="flex items-center justify-between mb-1 ">

   
    <div
      onClick={() => navigate("/projects")}
      className="flex items-center gap-1 text-gray-600 hover:text-violet-500 cursor-pointer transition"
    >
      <IoIosArrowBack size={18} />
         <h2 className="text-xl font-semibold text-blue-950">
   projectname:   {project?.name}
    </h2>
      {/* <span className="text-sm font-medium"></span> */}
    
    </div>

  
  </div>


  <div className=" flex justify-end">
    
    <AddTaskForm
      projectId={numericProjectId}
      initialData={editingTask}
      onTaskAdded={(newTask) =>
        setTasks((prev) => {
          if (editingTask) {
            return prev.map((t) =>
              t.id === editingTask.id ? newTask : t
            );
          }
          return [...prev, newTask];
        })
      }
    />
    
  </div>

 
  {tasks.length > 0 ? (
    <TaskList
      tasks={filteredTasks}
      filter={filter}
      setFilter={setFilter}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={setEditingTask}
    />
  ) : (
    <p className="text-gray-500 text-center">
      No tasks added for this project.
    </p>
  )}
</div>

  );
};

export default Taskpages;
