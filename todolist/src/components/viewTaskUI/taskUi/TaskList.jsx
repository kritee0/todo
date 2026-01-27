import React, { useState } from "react";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import TaskDetail from "./TaskDetail.jsx";
import TaskFilter from "../../logic/TaskFilter.jsx";
import { usePriority } from "../../../hook/usePriority.js";

const TaskList = ({
  tasks,
  filter,
  setFilter,
  onrequestDelete,
  onToggle,
  onEdit,
  setTasksStatue,
  onStatusChangeInParent
}) => {
  const [openDetails, setOpenDetails] = useState(null);

  const { selectedPriority, setSelectedPriority, sortedTasks } = usePriority(tasks);

 
  const finalTasks = sortedTasks().filter((task) => {
    if (filter === "all") return !task.completed;
    return task.status === filter;
  });

  return (
    <div>
     
      <div className="flex flex-col justify-between">
        <h2 className="text-xl font-bold text-indigo-500 mb-4">Tasks</h2>
      </div>

     
      <TaskFilter
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
      />

   
      <div className="max-w-full flex flex-col h-auto mt-4 space-y-4">
        {finalTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No tasks found.
          </p>
        ) : (
          finalTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-center border-gray-200 shadow-md h-auto p-4 rounded-md cursor-pointer"
            >
        
              <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
                <div
                  className="flex flex-col justify-end"
                  onClick={() => setOpenDetails(openDetails === task.id ? null : task.id)}
                >
                  <p>{task.title}</p>
                </div>
              </div>

              
              <div className="flex items-center space-x-3">
                <div className="bg-blue-400 px-2 rounded-md">
                  <p className="text-md text-white">{task.priority}</p>
                </div>

                <MdOutlineModeEditOutline
                  className={`cursor-pointer ${task.completed ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!task.completed) onEdit(task); 
                  }}
                />

                <MdDelete
                  className="cursor-pointer"
                  onClick={() => onrequestDelete(task)}
                />
              </div>

            
              {openDetails === task.id && (
                <TaskDetail
                  openDetails={openDetails}
                  setOpenDetails={setOpenDetails}
                  tasks={tasks}
                  setTasks={setTasksStatue}
                  onEdit={onEdit}
                  onStatusChangeInParent={onStatusChangeInParent}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;

