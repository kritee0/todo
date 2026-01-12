import React from "react";
import TaskButton from "../../pages/TaskButton.jsx"
import Priority from "../logic/Priority.jsx"

const TaskFilter = ({ filter, setFilter, selectedPriority, setSelectedPriority }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex space-x-4">
        <TaskButton
          text="All"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-blue-600 text-white" : ""}
        />
        <TaskButton
          text="Pending"
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "bg-blue-600 text-white" : ""}
        />
        <TaskButton
          text="Completed"
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "bg-blue-600 text-white" : ""}
        />
      </div>

      <Priority
        priority={selectedPriority}
        setPriority={setSelectedPriority}
      />
    </div>
  );
};

export default TaskFilter;

