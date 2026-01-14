import React, { useState, useEffect } from "react";
import { LiaTasksSolid } from "react-icons/lia";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import Popup from "../../../common/Popup";
import SubTaskForm from "./SubTaskForm";
import AddTaskForm from "../../../pages/Addtask";
import { updateTask } from "../../../hook/TaskCrud";

const TaskDetail = ({
  onEdit,
  onDelete,
  openDetails,
  setOpenDetails,
  tasks,
  editing,
}) => {
  const [taskData, setTaskData] = useState(null);
  const [addSubTask, setAddSubTask] = useState(false);
  const [editingSubTask, setEditingSubTask] = useState(null);

  useEffect(() => {
    const found = tasks.find((t) => t.id === openDetails);
    if (found) setTaskData(found);
  }, [tasks, openDetails]);

  if (!taskData) return null;

 
  const handleSubTaskDelete = (subTaskId) => {
    const newTask = taskData.subTasks.filter((sub) => sub.id !== subTaskId);
    const updatedTask = { ...taskData, subTasks: newTask };
    setTaskData(updatedTask);
    updateTask(updatedTask);
  };


  const handleSubTaskEdit = (subId) => {
    const item = taskData.subTasks.find((s) => s.id === subId);
    setEditingSubTask(item); 
  };

  return (
    <Popup>
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 space-y-4">
        <div className="flex justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <LiaTasksSolid className="text-xl text-blue-600" />
            <h2 className="text-lg font-semibold text-blue-950">
              Task Details
            </h2>
          </div>
          <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
            {taskData.priority}
          </span>
        </div>

        <div className="flex justify-between">
          <p className="flex gap-4">
            <span className="font-medium">Title</span>
            <span>{taskData.title}</span>
          </p>
          <div className="flex flex-col">
            <p className="flex flex-col">
              <span className="font-medium">TaskSchedule</span>
              <span>{new Date(taskData.createdAt).toLocaleString()}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">DueDate</span>
              <span>{new Date(taskData.date).toLocaleString()}</span>
            </p>
            <p className="flex flex-col">
              <span className="font-medium">Reminder</span>
              <span>
                {taskData.remainderDate
                  ? new Date(taskData.remainderDate).toLocaleString()
                  : ""}
              </span>
            </p>
          </div>
        </div>

        {taskData.subTasks?.length > 0 && (
          <div>
            <label className="font-semibold">SubTasks</label>
            {taskData.subTasks.map((st) => (
              <div key={st.id} className="bg-gray-200 rounded px-3 py-2 mt-2">
                <div className="flex justify-between">
                  <span>{st.title}</span>
                  <div className="flex gap-3 ">
                    <span>{st.priority}</span>
                    <span>
                      {st.date ? new Date(st.date).toLocaleDateString() : ""}
                    </span>
                    <span>
                      {st.remainderDate
                        ? new Date(st.remainderDate).toLocaleString()
                        : ""}
                    </span>
                    <MdOutlineModeEditOutline
                      onClick={() => handleSubTaskEdit(st.id)}
                    />
                    <MdDelete onClick={() => handleSubTaskDelete(st.id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setAddSubTask(true)}
          className="font-semibold text-blue-950"
        >
          Add Subtask
        </button>

        {addSubTask && (
          <SubTaskForm
            task={taskData}
            setTaskData={setTaskData}
            setAddSubTask={setAddSubTask}
          />
        )}

        {editingSubTask && (
          <SubTaskForm
            task={taskData}
            editingSubTask={editingSubTask}     
            setTaskData={setTaskData}           
            setEditingSubTask={setEditingSubTask} 
          />
        )}

        <div className="flex justify-between pt-3">
          <button onClick={() => setOpenDetails(null)}>Close</button>
          <div className="flex gap-2">
            <MdOutlineModeEditOutline onClick={() => onEdit(taskData)} />
            <MdDelete onClick={() => onDelete(taskData.id)} />
          </div>
        </div>
      </div>
      {editing && <AddTaskForm  />}
    </Popup>
  );
};

export default TaskDetail;

