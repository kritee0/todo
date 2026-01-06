import React from "react";
import { useState } from "react";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import TaskButton from "../../pages/TaskButton";

const TaskList = ({ tasks, filter, setFilter, onDelete, onToggle, onEdit }) => {
  const [openDetails, setOpenDetails] = useState(null);
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
        <div className="flex space-x-4 mb-4">
          <TaskButton
            text="All"
            onClick={() => setFilter("all")}
            className={` ${filter === "all" ? "bg-blue-600 text-white" : ""}`}
          />
          <TaskButton
            text="Pending"
            onClick={() => setFilter("pending")}
            className={` ${
              filter === "pending" ? "bg-blue-600 text-white" : ""
            }`}
          />
          <TaskButton
            text="Completed"
            onClick={() => setFilter("completed")}
            className={` ${
              filter === "Completed" ? "bg-blue-600 text-white" : ""
            }`}
          />
        </div>

        <div className="max-w-5xl flex flex-col space-y-4">
          {tasks.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between items-center border-2 border-gray-100 bg-white shadow-md h-24 p-4 rounded-md cursor-pointer"  onClick={() => setOpenDetails(todo.id)}
            >
              <div
                className="flex items-center space-x-4"
               
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    onToggle(todo);
                  }}
                />
                <div>
                  <p
                    className={
                      todo.completed
                        ? "line-through text-gray-400"
                        : "font-semibold"
                    }
                  >
                    {todo.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Task Schedule: {new Date(todo.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <MdOutlineModeEditOutline
                  className="cursor-pointer"
                  onClick={() => onEdit(todo)}
                />
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => onDelete(todo.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {openDetails &&
          (() => {
            const task = tasks.find((t) => t.id === openDetails);
            if (!task) return null;

            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
                <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
                  <h2 className="text-xl font-semibold mb-4 border-b-2 pb-2">
                    Task Details
                  </h2>

                  <p>
                    <strong>Title:</strong> {task.title}
                  </p>
                  <p className="mt-2">
                    <strong>Description:</strong>{" "}
                    {task.description || "No description"}
                  </p>
                  <p className="mt-2">
                    <strong>Priority:</strong> {task.priority || "None"}
                  </p>
                  <p className="mt-2">
                    <strong>Created:</strong>{" "}
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-2">
                    <strong>TaskDeadline:</strong>{" "}
                    {new Date(task.date).toLocaleString()}
                  </p>

                  <button
                    onClick={() => setOpenDetails(null)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })()}
      </div>
    </>
  );
};

export default TaskList;
