import React, { useState, useEffect } from "react";
import { LiaTasksSolid } from "react-icons/lia";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Popup from "../../../common/Popup";
import SubTaskForm from "./SubTaskForm";
import Status from "../../logic/Status";
import { updateTask } from "../../../hook/TaskCrud";
// import { updateProject } from "../../../hook/ProjectCrud";
import Priority from "../../logic/Priority";
import { usePriority } from "../../../hook/usePriority";
import { BsThreeDotsVertical } from "react-icons/bs";

const TaskDetail = ({
  // onEdit,
  // onDelete,
  openDetails,
  setOpenDetails,
  tasks,
  // editing,
  onStatusChangeInParent,
}) => {
  const [taskData, setTaskData] = useState(null);
  const [addSubTask, setAddSubTask] = useState(false);
  const [editingSubTask, setEditingSubTask] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);


 
 
  const [currentSubTask, setCurrentSubTask] = useState({
     title: "",
     date: "",
     description:"",
     remainderDate: "",
     priority: "none",
     completed: false,
   });
  const { selectedPriority, setSelectedPriority, sortedTasks } = usePriority(
    taskData?.subTasks || [],
  );

  const [openSubTasksId, setOpenSubTasksId] = useState(null);

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
  const handleStatusChange = async (newStatus) => {
    const completed = newStatus === "completed";
    const updatedTask = { ...taskData, status: newStatus, completed };

    setTaskData(updatedTask);

    onStatusChangeInParent(updatedTask);

    await updateTask(updatedTask);

    setOpenStatus(false);
  };
  const handleToggle = (id) => {
    setOpenSubTasksId((prev) => (prev === id ? null : id));
  };

  const handleCheckbox=async(subTasks)=>{//wrong cah
    const completed=!subTasks.completed
    const status=completed?"completed":""
    await updateTask([...taskData.subTasks,status])
    console.log("updated status is",status)

  }

  // const handledot=(id)=>{
  //   setOpenPriority(prev=>prev)


  // }
  const handleSubPriority=async(value,subId)=>{
    // currentSubTask.priority.find(s=>s.id===id)
const updatedSubTasks=taskData.subTasks.map(sub=>(sub.id===subId)?{...sub,priority:value}:sub)
// setCurrentSubTask((prev)=>([...prev,updatePriority]))
const updatedTask = {...taskData, subTasks: updatedSubTasks};
// setCurrentSubTask(prev=>({...prev,subTasks:updatedSubTasks}))
setTaskData(updatedTask)
console.log("The task ahs been updated",updateTask)
await updateTask(updatedTask)
console.log(updatedTask)


    


  }
  return (
    <Popup>
      <div className="flex cursor-pointer justify-end ">
        <button onClick={() => setOpenDetails(null)}>
          <RxCross2 />
        </button>
      </div>
      <div className="bg-white w-full rounded-2xl p-6 space-y-4">
        <div className="flex justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <LiaTasksSolid className="text-xl text-blue-600" />
            <h2 className="text-lg font-semibold text-blue-950">
              Task Details
            </h2>
          </div>
          <Status
            openStatus={openStatus}
            setOpenStatus={setOpenStatus}
            onStatusChange={handleStatusChange}
            currentStatus={taskData.status}
          />
          {/* <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
            {taskData.priority}
          </span> */}
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
            <div className="flex justify-between">
              <label className="font-semibold">SubTasks</label>
              <Priority priority={selectedPriority} setPriority={setSelectedPriority}/>
            </div>

            {sortedTasks().map((st, i) => (
              <div className=" flex  main div p-4 gap-4   ">
                <input type="checkbox" checked={st.completed}  onChange={(e)=>{ e.stopPropagation() ,  handleCheckbox(st.id)}} />
                <div
                  key={st.id}
                  className="bg-white border shadow-2xl border-gray-300 rounded px-3 py-2 mt-2 w-full  "
                >
                  <div
                    className="flex justify-between "
                    onClick={() => {
                      handleToggle(st.id);
                    }}
                  >
                    <div className="group relative">
                      <span>{st.title}</span>

                      <div
                        className="absolute left-0 top-full mt-1
                                    hidden group-hover:block
                                    bg-gray-800 text-white text-xs
                                    px-2 py-1 rounded shadow
                                    whitespace-nowrap
                                    z-20"
                      >
                        <span className="">
                          {st.date
                            ? new Date(st.date).toLocaleDateString()
                            : "NO deadline"}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3  ">
                      <div className="bg-red-100 rounded-2xl px-3">
                        {/* <span className=" relative text-black font-semibold" onClick={(e)=>{ e.stopPropagation(),handleEdit(st.id)}}> */}
                          {/* {Priority?st.priority:selectedPriority} */}
                     {/* {st.priority} */}
               
             <Priority 
  priority={st.priority}
  setPriority={(value) => handleSubPriority(value, st.id)}
/>

               
           

                
                        {/* </span> */}
                      </div>

                      <span>
                        {st.remainderDate
                          ? new Date(st.remainderDate).toLocaleString()
                          : ""}
                      </span>
                      <MdOutlineModeEditOutline
                        onClick={() => handleSubTaskEdit(st.id)}
                      />
                      <MdDelete onClick={() => handleSubTaskDelete(st.id)} />
                        {/* <BsThreeDotsVertical  onClick={(e)=>{ e.stopPropagation(),handledot(st.id)}}/> */}
                    </div>
                  </div>
                  {/* {openPriority && (
                    <div className=" mt-2 flex justify-end">
                      <Priority/>
                    </div>
                  )} */}


                  {openSubTasksId === st.id && (
                    <div className="p-2 bg-gray-100 mt-1 rounded">
                      <span>{st.description || "No description added"}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setAddSubTask((prev) => !prev)}
          className="font-semibold text-blue-950"
        >
          Add Subtask
        </button>

        {addSubTask && (
          <SubTaskForm
            task={taskData}
            setTaskData={setTaskData}
            setAddSubTask={setAddSubTask}
            currentSubTask={currentSubTask}
            setCurrentSubTask={setCurrentSubTask}

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
      </div>
      {/* {editingTask && (
        <AddTaskForm
          //  projectId={projectId}
          initialData={editingTask}
          onTaskAdded={(data) => handleEditSave(editingTask.id, data)}
        />
      )} */}
    </Popup>
  );
};

export default TaskDetail;
