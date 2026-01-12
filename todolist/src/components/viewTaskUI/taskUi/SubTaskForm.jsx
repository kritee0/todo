import React, { useState } from "react";
import Priority from "../../logic/Priority";
import { LuPlus } from "react-icons/lu";

const SubTaskForm = ({  subTasks,setSubTasks,onClose }) => {
  
  const [title, setTitle] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [date, setDate] = useState("");
  const [remainderDate, setRemainderDate] = useState("");
  const [priority, setPriority] = useState("none");
 

  function handleSubmit() {
    if (!title.trim()) return;

    const newSubTask = {
      id:Date.now(),
      title,
      date,
      remainderDate,
      priority,
      completed: false,
      createdAt: new Date()
    };

   setSubTasks([ ...subTasks, newSubTask]);
    console.log(newSubTask)
   

  }
  const handleMultipleSubTask=()=>{

  }
  

  return (
    <>
    <div className="bg-gray-50 p-4 rounded-xl space-y-3">

{ subTasks.map(()=>{
  <div key={id} className="flex justify-between">
    <input
        type="text"
        placeholder="Add subtask title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border-b bg-transparent outline-none text-sm px-1 py-1"
       
      />
       <LuPlus onClick={handleMultipleSubTask} />
      </div>   

})}



  
    

      <button
        className="text-xs text-blue-600 hover:underline"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "Hide details" : "+ Add details"}
      </button>

   
      {showDetails && (
        <div className="space-y-2 text-sm">

          <div className="flex justify-between items-center">
            <span>Due Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border px-2 py-0.5 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <span> Reminder</span>
            <input
              type="datetime-local"
              value={remainderDate}
              onChange={(e) => setRemainderDate(e.target.value)}
              className="border px-2 py-0.5 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Priority</span>
            <Priority selected={priority} setSelected={setPriority} />
          </div>
        </div>
      )}

    
      <div className="flex justify-end gap-3 pt-2">
        <button
          className="text-xs px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="text-xs px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Add Subtask
        </button>
      </div>
    </div>
    </>
  );
};

export default SubTaskForm;
