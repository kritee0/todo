import React, { useState,useEffect } from "react";
import { LiaTasksSolid } from "react-icons/lia";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import Popup from "../../../common/Popup";
import SubTaskForm from "./SubTaskForm";


const TaskDetail = ({
  onEdit,
  onDelete,
  openDetails,
  setOpenDetails,
  tasks,
}) => { 
const[addSubTask,setAddSubTask]=useState(false)
const[subTasks,setSubTasks]=useState([])

const task = tasks.find((t) => t.id === openDetails);
if (!task) return null; 

// useEffect(() => {
//   if (subTasks.length === 0) {
//     setSubTasks([
//       {
//         id: Date.now(),
//         title: "",
//         date: "",
//         remainderDate: "",
//         priority: "none",
//         completed: false,
//         createdAt: new Date(),
//       },
//     ]);
//   }
// }, []);


  return (
    <>
    <Popup >
     <div className="bg-white w-full max-w-xl rounded-2xl p-6 space-y-4">


  <div className="flex items-center justify-between border-b pb-3">
    <div className="flex items-center gap-2">
      <LiaTasksSolid className="text-xl text-blue-600" />
      <h2 className="text-lg font-semibold text-blue-950">Task Details</h2>
       </div>
    <p className="flex justify-between">
     
      <span className="px-2 py-0.5 rounded text-xs bg-gray-200">
        {task.priority || ""}
      </span>
    </p>
   
  </div>


  <div className="space-y-2 text-sm text-gray-700">
    <div className="flex  justify-between space-x-3.5">

    <p className="flex justify-between">
      <span className="font-medium">Title</span>
      <span>{task.title}</span>
    </p>
<div className="flex flex-col">
   <p className=" flex flex-col">
      <span className="font-medium">TaskSchedule</span>
      <span>{new Date(task.createdAt).toLocaleString()}</span>
    </p>
     <p className="flex flex-col">
      <span className="font-medium">DueDate</span>
      <span>{new Date(task.date).toLocaleString()}</span>
    </p>

    <p className="flex flex-col">
      <span className="font-medium">Reminder</span>
      <span>
        {task.remainderDate
          ? new Date(task.remainderDate).toLocaleString()
          : ""}
      </span>
    </p>
   

   
    </div>
     
   


    </div>

    <p className="flex justify-between">
      <span className="font-medium">Description</span>
      <span>{task.description || "No description"}</span>
    </p>
      <p className="flex justify-between">
      <span className="font-medium">Completed</span>
      <span className={`text-sm ${task.completed ? "text-green-600" : "text-red-500"}`}>
        {task.completed ? "Yes" : "No"}
      </span>
    </p>

 

   
   
  </div>
  {subTasks.length===0?"":  ( <div className="">


          <label  className=" text-md font-semibold text-blue-950 border-b-2 border-gray-200">SubTasks</label>
     {subTasks.map((subitem)=>(
      <div className="flex   justify-between bg-gray-200 rounded-md px-3 py-2 mt-4" >

   
      <div className="flex flex-col ">
        {subitem.title}
        {subitem.date}
         {subitem.remainderDate}
         {subitem.priority}
         </div>
         </div>

        
      


    ))}
    </div>)}
 

<button onClick={()=>{setAddSubTask(prev=>!prev)}} className="text-blue-950 font-semibold">
  AddSubTask
</button> 
{addSubTask && (<div className=" ">
    <SubTaskForm
      onClose={()=>setAddSubTask(false)}
 
      subTasks= {subTasks} 
      setAddSubTask={setAddSubTask}
      setSubTasks={setSubTasks}/>
  </div>)}
 

  
  <div className="flex justify-between items-center ">

    <button
      className="px-4 py-1.5 text-sm bg-gray-200 rounded hover:bg-gray-300"
      onClick={() => setOpenDetails(null)}
    >
      Close
    </button>

    <div className="flex gap-3">
      <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300">
        <MdOutlineModeEditOutline onClick={() => onEdit(task)} />
      </button>

      <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-red-200">
        <MdDelete onClick={() => onDelete(task.id)} />
      </button>
    </div>
  </div>

</div>

      </Popup>
      
    </>
  );
};
export default TaskDetail;
