import React, {  useState } from "react";
import { usePriority } from "../../../hook/usePriority.js";
import TaskDetail from "./TaskDetail.jsx";
import TaskFilter from "../../logic/TaskFilter.jsx";
const TaskList = ({
  tasks,
  filter,
  setFilter,
  onDelete,
  onToggle,
  onEdit,
  editingTask,
}) => {
  const [openDetails, setOpenDetails] = useState(null);
  const { selectedPriority, setSelectedPriority, sortedTasks } =
    usePriority(tasks);
  const filteredTasks = tasks.filter((todo) => {
    if (filter === "pending") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const finalTasks = sortedTasks(filteredTasks);

  return (
    <>
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
          {finalTasks.map((todo) => (
            <>
              <div className="flex justify-between  items-center border-2 border-gray-200 bg-white shadow-md h-24 p-4 rounded-md cursor-pointer">
                <div className=" flex items-center">
                  <div className=" flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(e) => {
                        e.stopPropagation();
                        onToggle(todo);
                      }}
                    />
                    <div className="flex  flex-col justify-end">
                      <p
                        className={
                          todo.completed
                            ? "line-through text-gray-400"
                            : "font-semibold"
                        }
                      >
                        {todo.title}
                      </p>
                      <div>
                        <p className="text-sm text-gray-500">
                          Task Schedule:{" "}
                          {new Date(todo.createdAt).toLocaleString()}
                        </p>
                        <p
                          className="text-sm text-gray-500"
                          onClick={() => setOpenDetails(todo.id)}
                        >
                          ViewTask Details
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <p className="text-md text-red ">{todo.priority}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <TaskDetail
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        tasks={tasks}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
};

export default TaskList;
