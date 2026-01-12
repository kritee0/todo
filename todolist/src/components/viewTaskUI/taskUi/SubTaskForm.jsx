import React, { useState } from "react";
import TaskButton from "../../../pages/TaskButton";

const SubTaskForm = ({ task, onClose, onAddSubTask }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [remainderDate, setRemainderDate] = useState("");

  function handleSubmit() {
    const newSubTask = {
      id: Date.now(),
      title,
      date,
      remainderDate,
      priority: "low"
    };

    if (task && onAddSubTask) {
      onAddSubTask(task.id, newSubTask);
    }

    onClose();
  }

  return (
    <div className="fixed z-50 bg-white shadow-2xl p-4 rounded-md">
      <h3 className="text-lg font-bold mb-2">Add Subtask for {task?.title}</h3>

      <input
        type="text"
        placeholder="Subtask title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-b-2 px-2 py-1 w-full mb-2"
      />

      <TaskButton date={date} setDate={setDate} />
      <TaskButton date={remainderDate} setDate={setRemainderDate} />

      <div className="flex space-x-2 mt-3">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubTaskForm;