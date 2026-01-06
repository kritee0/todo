import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import { getProjectById  } from '../hook/ProjectCrud'
import { getTaskByProjectId } from '../hook/TaskCrud'
import { initDB } from '../database/db'
import AddTaskForm from './Addtask'

const Taskpages = () => {
  const[tasks,setTask]=useState([])
  const[project,setProject]=useState(null)
    const {projectId}=useParams()
    console.log(projectId)
    console.log( "project type is " ,typeof projectId)
    const numericProjectId = Number(projectId)
    console.log("types of NumericeProjectID",numericProjectId)
   
   useEffect(() => {
  const fetchTask = async () => {
    try {
      await initDB();


      const projectData = await getProjectById(numericProjectId);
      
      setProject(projectData);


      const tasksFromDb = await getTaskByProjectId(numericProjectId);
      console.log("taskare",tasksFromDb)
      setTask(tasksFromDb);

      console.log("Project:", projectData);
      console.log("Tasks:", tasksFromDb);
    } catch (error) {
      console.log("Error fetching project/tasks:", error);
    }
  };

  fetchTask();
}, [numericProjectId]);

  return (

    <>
 <div>
  <h2 className="font-bold text-2xl text-blue-900 ">{project?.name}</h2>

<AddTaskForm
projectId={numericProjectId}


onTaskAdded={(newtasks)=>(setTask(prev=>[...prev,newtasks]))}/>
  {tasks.length === 0 ? (
    <p className="text-gray-500">No tasks added for this project.</p>
  ) :
   (
    tasks.map((task) => (
      <div key={task.id}>
        <p>{task.title}</p>
        <p>{task.description}</p>
      </div>
    ))
  )}
</div>

    
      
    </>
  )
}

export default Taskpages