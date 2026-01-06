import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getProjectById } from '../hook/ProjectCrud';
import { getTaskByProjectId } from '../hook/TaskCrud'; 
import { initDB } from '../database/db';

const ProjectTask = () => {
  const [tasks, setTask] = useState([]);  
  const [project, setProject] = useState(null);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        await initDB();

        const projectData = await getProjectById(Number(projectId));
        setProject(projectData);

        const tasksFromDb = await getTaskByProjectId(Number(projectId));
        setTask(tasksFromDb);

        console.log("Project:", projectData);
        console.log("Tasks:", tasksFromDb);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchTask();
  }, [projectId]);

  return (
    <div>
      <h2>{project?.name} Tasks</h2>

      {tasks.length > 0 ? (
        tasks.map((t) => (
          <div key={t.id}>
            <p>{t.title}</p>
            <p>{t.description}</p>
          </div>
        ))
      ) : (
        <p>No tasks found for this project</p>
      )}
    </div>
  );
};

export default ProjectTask;
