import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectById } from "../../../hook/ProjectCrud";
import { getTaskByProjectId } from "../../../hook/TaskCrud";
import { initDB } from "../../../database/db";
import TaskList from "./viewTaskUI/TaskList";

const ProjectTask = () => {
  const [tasks, setTask] = useState([]);
  const [project, setProject] = useState(null);
  const [filter, setFilter] = useState("all"); 
  const { projectId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        await initDB();
        const projectData = await getProjectById(Number(projectId));
        setProject(projectData);

        const tasksFromDb = await getTaskByProjectId(Number(projectId));
        setTask(tasksFromDb);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchTask();
  }, [projectId]);


  const handleDelete = (id) => {
    setTask((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggle = (task) => {
    setTask((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleEdit = (task) => {
    console.log("Edit task:", task);

  };


  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) =>
          filter === "pending" ? !t.completed : t.completed
        );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{project?.name} Tasks</h2>
      <TaskList
        tasks={filteredTasks}
        filter={filter}
        setFilter={setFilter}
        onDelete={handleDelete}
        onToggle={handleToggle}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ProjectTask;