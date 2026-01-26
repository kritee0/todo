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
  
  const { selectedPriority, setSelectedPriority, sortedTasks } =
    usePriority(tasks);
 const finalTasks = sortedTasks().filter((task) => {
 
  if (filter === "all"){
    
 return !task.completed;
  }
 
  return task.status === filter;
});

  // const finalTasks = sortedTasks(filteredTasks);

  return (
    <div>
      <div className="flex  flex-col justify-between">
        <h2 className="text-2xl font-bold text-indigo-500 mb-4">My Tasks</h2>
      </div>
      <TaskFilter
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
      />
       {/* <TaskButton text="Add Task" primary onClick={() => setShowForm(true)} /> */}
  
      <div className="max-w-full  flex flex-col   h-auto   mt-4   space-y-4 ">
        
        {finalTasks.map((task) => (
          <div
            key={task.id}
          
            className={` flex  justify-between items-center   border-gray-200 shadow-md h-auto p-4 rounded-md cursor-pointer
                  }`}
          >
            <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
              {/* <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggle(task);
                }}
              /> */}
              <div className="flex flex-col justify-end "   onClick={() =>
                    setOpenDetails(openDetails === task.id ? null : task.id)
                  }>
                <p
                 
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
              <div className="bg-blue-400 px-2 rounded-md">
                   <p className="text-md text-white">{task.priority}</p>
                    </div>
                    <MdOutlineModeEditOutline
                      className={`cursor-pointer ${
                        task.completed ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation(); 
                        console.log("EDIT ICON CLICKED:", task.id);      
                        if (!task.completed) {
                          onEdit(task);
                        }
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
