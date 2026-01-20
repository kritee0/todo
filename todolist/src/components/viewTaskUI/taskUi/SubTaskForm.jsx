import React, { useState, useEffect } from "react";
import Priority from "../../logic/Priority";
import { BsThreeDotsVertical } from "react-icons/bs";
import { updateTask } from "../../../hook/TaskCrud";

const SubTaskForm = ({ task, setTaskData, setAddSubTask, editingSubTask, setEditingSubTask,currentSubTask,setCurrentSubTask }) => {
  const [showDetail, setShowDetail] = useState(false);
 

  useEffect(() => {
    if (editingSubTask) {
      setCurrentSubTask(editingSubTask);
      setShowDetail(true);
    }
  }, [editingSubTask]);

  const handleSave = () => {
    if (!currentSubTask.title.trim()) return;

    let updatedSubTasks;

    if (editingSubTask) {
     
      updatedSubTasks = task.subTasks.map((sub) =>
        sub.id === editingSubTask.id ? currentSubTask : sub
      );
    } else {
     
      updatedSubTasks = [
        ...(task.subTasks || []),
        { ...currentSubTask, id: Date.now(), createdAt: new Date() },
      ];
    }

    const updatedTask = { ...task, subTasks: updatedSubTasks };
    setTaskData(updatedTask);
    updateTask(updatedTask);

 
    setCurrentSubTask({
      title: "",
      date: "",
      remainderDate: "",
      priority: "none",
      completed: false,
    });

    if (editingSubTask) setEditingSubTask(null); 
    setAddSubTask(false);
  };

  return (
    <div className="bg-gray-100 rounded-md px-3 py-2 space-y-3">
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Add Subtask"
          value={currentSubTask.title}
          onChange={(e) => setCurrentSubTask({ ...currentSubTask, title: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="w-full rounded-2xl bg-white px-3 py-2"
        />
        <button onClick={() => setShowDetail((p) => !p)}>
          <BsThreeDotsVertical />
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Add description"
          value={currentSubTask.description}
          onChange={(e) => setCurrentSubTask({ ...currentSubTask, description: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="w-full rounded-2xl bg-white px-3 py-2"
        />
        
      </div>


      {showDetail && (
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Due Date</span>
            <input
              type="date"
              value={currentSubTask.date}
              onChange={(e) => setCurrentSubTask({ ...currentSubTask, date: e.target.value })}
            />
          </div>

          <div className="flex justify-between">
            <span>Reminder</span>
            <input
              type="datetime-local"
              value={currentSubTask.remainderDate}
              onChange={(e) =>
                setCurrentSubTask({ ...currentSubTask, remainderDate: e.target.value })
              }
            />
          </div>

          <div className="flex justify-between">
            <span>Priority</span>
            <Priority
              priority={currentSubTask.priority}
              setPriority={(value) => setCurrentSubTask({ ...currentSubTask, priority: value })}
            />
          </div>
        </div>
      )}

      {/* <button
        onClick={handleSave}
        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold"
      >
        {editingSubTask ? "Save Edit" : "Add Subtask"}
      </button> */}
    </div>
  );
};

export default SubTaskForm;


