import React, { useState } from "react";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import TaskDetail from "./TaskDetail.jsx";
import TaskFilter from "../../logic/TaskFilter.jsx";
import { usePriority } from "../../../hook/usePriority.js";
import TaskButton from "../../../pages/TaskButton.jsx";

const TaskList = ({
  tasks,
  filter,
  setFilter,
  onrequestDelete,
  onToggle,
  onEdit,
}) => {
  const [openDetails, setOpenDetails] = useState(null);
  const { selectedPriority, setSelectedPriority, sortedTasks } =
    usePriority(tasks);
  


 const finalTasks = sortedTasks().filter((task) => {
  if (filter === "completed") return task.completed;
  if (filter === "pending") return !task.completed;
  if(filter==="ongoing") return !task.completed;
  if(filter==="Abondant") return !task.Skip;
  return true;
});

  // const finalTasks = sortedTasks(filteredTasks);

  return (
    <div>
      <div className="flex  flex-col justify-between">
        <h2 className="text-2xl font-bold text-indigo-500 mb-4">My Tasks</h2>
      </div>

      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
      />
       {/* <TaskButton text="Add Task" primary onClick={() => setShowForm(true)} /> */}

      <div className="max-w-full  flex flex-col   h-auto    space-y-4 ">
        
        {finalTasks.map((task) => (
          <div
            key={task.id}
            onClick={() =>
                    setOpenDetails(openDetails === task.id ? null : task.id)
                  }
            className="flex  justify-between items-center bg-opacity/50  border-gray-200 shadow-md h-auto p-4 rounded-md cursor-pointer"
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
                {/* <p className="text-sm text-gray-500">
                  Task Schedule: {new Date(task.createdAt).toLocaleString()}
                </p> */}
                {/* <p
                  className="text-sm text-blue-400 underline cursor-pointer"
                  
                >
                  View Task Details
                </p> */}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MdOutlineModeEditOutline
                className="cursor-pointer"
                onClick={() => onEdit(task)}
              />
              <MdDelete
                className="cursor-pointer"
                onClick={() => onrequestDelete(task)}
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
                // onDelete={onDelete}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
