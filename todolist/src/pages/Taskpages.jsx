import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IoIosArrowBack } from "react-icons/io";
import { useProjectTasksHook } from "../hook/useProjectTaskHook";
import { getTaskByProjectId } from "../hook/TaskCrud";


const Taskpages = () => {
  
  const {projectId}=useParams();
  console.log(" project id",projectId)

 const navigate = useNavigate();
 const {
    project,
    tasks,
      SetTasks,
    // handleToggle,
    // handleDelete,
    // setEditingTask,
  } = useProjectTasksHook();

//  useEffect(() => {
 
//   const fetchData = async () => {
//     const hehe = await getTaskByProjectId(projectId); 
//     console.log("this is", {hehe});  
//   };
  
//   fetchData();
// },[projectId] );  
useEffect(() => {
  const fetchData = async () => {  
    const fetchedTasks = await getTaskByProjectId(projectId);
     console.log("Fetched tasks:", fetchedTasks); 
  
    SetTasks(fetchedTasks);    
  }; 

  if (projectId) fetchData();
}, [projectId]);
// useEffect(()=>{
//   console.log("abc")
// })

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 hover:text-violet-500 cursor-pointer mb-3"
      >
        {/* <IoIosArrowBack size={18} /> */}
        <h2 className="text-xl font-semibold text-blue-950">
         {project?.name}


          <div>
        {tasks.length === 0 ? (
          <p>No tasks found for this project.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="p-3 mb-2 border rounded hover:bg-gray-100 flex justify-between items-center"
            >
              <span>{task.title}</span>
            </div>
          ))
        )}
      </div>
        </h2>
      </div>

    </div>


  );
};

export default Taskpages;
