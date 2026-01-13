import React, { useState } from "react";
import Priority from "../../logic/Priority";
import { LuPlus } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const SubTaskForm = ({  setSubTasks, setAddSubTask }) => {
  const [showDetail, setShowDetail] = useState(false);




  const [currentSubTask, setCurrentSubTask] = useState({
    title: "",
    date: "",
    remainderDate: "",
    priority: "none",
    completed: false,
  });

  const handleSave = () => {
    if (!currentSubTask.title.trim()) return;

    setSubTasks(prev => [
      ...prev,
      { ...currentSubTask, id: Date.now(), createdAt: new Date() }
    ]);

   
    setCurrentSubTask({
      title: "",
      date: "",
      remainderDate: "",
      priority: "none",
      completed: false,
    });
console.log("data is",setSubTasks)
    setShowDetail(false);
  };


  const removeSubTask = (id) => {
    setSubTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="bg-gray-100 rounded-md px-3 py-2 space-y-3">

      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Add Subtask"
          value={currentSubTask.title}
          onChange={(e) =>
            setCurrentSubTask(prev => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave();
              setAddSubTask(false)
            }
          }}
          className="w-full rounded-2xl text-black bg-white border-gray-400 px-3 py-2"
        />

        <button
          onClick={() => setShowDetail(prev => !prev)}
          className="text-blue-950 text-sm underline"
        >
          <BsThreeDotsVertical />
        </button>
      </div>

      {showDetail && (
        <div className="flex flex-col mt-2 space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>Due Date</span>
            <input
              type="date"
              value={currentSubTask.date}
              onChange={(e) =>
                setCurrentSubTask(prev => ({ ...prev, date: e.target.value }))
              }
              className="border px-2 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Reminder</span>
            <input
              type="datetime-local"
              value={currentSubTask.remainderDate}
              onChange={(e) =>
                setCurrentSubTask(prev => ({ ...prev, remainderDate: e.target.value }))
              }
              className="border px-2 rounded"
            />
          </div>

          <div className="flex justify-between items-center">
            <span>Priority</span>
            <Priority priority={currentSubTask.priority} setPriority={(value)=>{setCurrentSubTask(prev=>({   
                  ...prev,priority:value
      }))}} />
          </div>
        </div>
      )}

     
      {/* <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="bg-blue-300 px-4 py-1 rounded-md hover:bg-blue-400"
        >
          Save Subtask
        </button>
      </div> */}

     
   </div>
  );
};

export default SubTaskForm;

