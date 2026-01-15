import React, { useState } from "react";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import TaskDetail from "./TaskDetail.jsx";
import TaskFilter from "../../logic/TaskFilter.jsx";
import { usePriority } from "../../../hook/usePriority.js";

const TaskList = ({
  tasks,
  filter,
  setFilter,
  onDelete,
  onToggle,
  onEdit,
}) => {
  const [openDetails, setOpenDetails] = useState(null);
  const { selectedPriority, setSelectedPriority, sortedTasks } =
    usePriority(tasks);
    const[value,setValue]=useState

  // Filter tasks based on filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const finalTasks = sortedTasks(filteredTasks);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      </div>

      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
      />

      <div className="max-w-4xl flex flex-col space-y-4">
        {finalTasks.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center border-2 border-gray-200 bg-white shadow-md h-24 p-4 rounded-md cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggle(task);
                }}
              />
              <div className="flex flex-col justify-end">
                <p
                  className={
                    task.completed ? "line-through text-gray-400" : "font-semibold"
                  }
                >
                  {task.title}
                </p>
                <p className="text-sm text-gray-500">
                  Task Schedule: {new Date(task.createdAt).toLocaleString()}
                </p>
                <p
                  className="text-sm text-blue-500 underline cursor-pointer"
                  onClick={() =>
                    setOpenDetails(openDetails === task.id ? null : task.id)
                  }
                >
                  View Task Details
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MdOutlineModeEditOutline
                className="cursor-pointer"
                onClick={() => onEdit(task)}
              />
              <MdDelete
                className="cursor-pointer"
                onClick={() => onDelete(task.id)}
              />
              <p className="text-md text-red">{task.priority}</p>
            </div>

            {openDetails === task.id && (
              <TaskDetail
                openDetails={openDetails}
                setOpenDetails={setOpenDetails}
                tasks={tasks}
                setTasks={() => {}}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
