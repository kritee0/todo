import React from "react";
import { LiaTasksSolid } from "react-icons/lia";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import Popup from "../../../common/Popup";

const TaskDetail = ({
  onEdit,
  onDelete,
  openDetails,
  setOpenDetails,
  tasks,
}) => {
const task = tasks.find((t) => t.id === openDetails);
if (!task) return null; 
  return (
    <>
    <Popup >
      
      <div className="bg-white max-w-full w-full ">
  <h2 className="text-xl font-semibold text-black mb-4">Task Details</h2>
  </div>

  <p>
    <span className="font-semibold">Title:</span> <span>{task.title}</span>
  </p>

  <p>
    <span className="font-semibold">Description:</span>{" "}
    <span>{task.description || "No description"}</span>
  </p>

  <p>
    <span className="font-semibold">Priority:</span>{" "}
    <span>{task.priority || "None"}</span>
  </p>

  <p>
    <span className="font-semibold">Completed:</span>{" "}
    <span>{task.completed ? "Yes" : "No"}</span>
  </p>

  <p>
    <span className="font-semibold">Deadline:</span>{" "}
    <span>{new Date(task.date).toLocaleString()}</span>
  </p>

  <p>
    <span className="font-semibold">Reminder:</span>{" "}
    <span>{task.remainderDate ? new Date(task.remainderDate).toLocaleString() : "None"}</span>
  </p>

  <p>
    <span className="font-semibold">Created At:</span>{" "}
    <span>{new Date(task.createdAt).toLocaleString()}</span>
  </p>

  


     <div className="flex justify-between ">
      <button
    className="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
    onClick={() => setOpenDetails(null)}
  >
    Close
  </button>

    

<div className="flex gap-4  justify-center items-center">
  <div className="w-6 h-6  bg-gray-300 rounded-full flex   justify-center items-center">
   
      <MdOutlineModeEditOutline
        className=""
        onClick={(e) => {
          e.stopPropagation();
          onEdit(todo);
        }}
      />
      </div>
      <div className=" w-6 h-6  bg-gray-300 rounded-full  flex justify-center items-center">
      <MdDelete
        className="flex"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(todo.id);
        }}
      />
      </div>
      </div>
      </div>
      </Popup>
      
    </>
  );
};
export default TaskDetail;
