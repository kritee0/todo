import React, { useState, useEffect,useRef } from "react";
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
import { toast } from "react-toastify";
// import { BsThreeDotsVertical } from "react-icons/bs";
const TaskDetail = ({
  openDetails,
  setOpenDetails,
  tasks,

  onStatusChangeInParent,
}) => {
  const [taskData, setTaskData] = useState(null);
  const [addSubTask, setAddSubTask] = useState(false);
  const [editingSubTask, setEditingSubTask] = useState(null);
  const [openStatus, setOpenStatus] = useState(false);
  const [currentSubTask, setCurrentSubTask] = useState({
    title: "",
    date: "",
    description: "",
    remainderDate: "",
    priority: "none",
    completed: false,
  });
  const taskDetailRef=useRef(null)
  const { selectedPriority, setSelectedPriority, sortedTasks } = usePriority(
    taskData?.subTasks || [],
  );
// const scrollToTask=()=>{
//   if(taskDetailRef.current){
//     taskData.current.scrollIntoView({behavior:"smooth"})
//   }

// }
useEffect(()=>{
  if(editingSubTask && taskDetailRef.current){
    taskDetailRef.current.scrollIntoView({behavior:"smooth"})
  }


},[editingSubTask])

  const [openSubTasksId, setOpenSubTasksId] = useState(null);

  useEffect(() => {
    const found = tasks.find((t) => t.id === openDetails);
    if (found) setTaskData(found);
  }, [tasks, openDetails]);

  if (!taskData) return null;
  // useEffect(()=>{
  //   const allDone=taskData.subTasks.every(sub=>sub.completed)
  //   if(allDone && taskData.status==!completed){
  //   handleStatusChange("completed")
  //   }
  //   if(!allDone&& taskData.subTasks===completed){
  //     handleStatusChange("pending")

  //   }

  // },[taskData.subTasks])

  // useEffect(()=>{

  // },[taskData?.subTasks])
  // useEffect(()=>{
  //   console.log(openDetails)
  // },[openDetails])

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
    if (newStatus === "completed") {
      const allComplete = taskData.subTasks.every(
        (sub) => sub.completed === true,
      );
      if (!allComplete) {
        toast.error("Complete all subtasks first");
        return;
      }
    }
    const updatedTask = {
      ...taskData,
      status: newStatus,
      completed: newStatus === "completed",
    };

    setTaskData(updatedTask);
    onStatusChangeInParent(updatedTask);
    await updateTask(updatedTask);

    setOpenStatus(false);
  };

  const handleToggle = (id) => {
    setOpenSubTasksId((prev) => (prev === id ? null : id));
  };

  // const handleCheckbox=async(subTasks)=>{//wrong cah
  //   const completed=!subTasks.completed
  //   const status=completed?"completed":""
  //   await updateTask([...taskData,  ])
  //   console.log("updated status is",status)

  // }

  // const handledot=(id)=>{
  //   setOpenPriority(prev=>prev)

  // }
  const handleCheckbox = async (id) => {
 
  const updatedSubTasks = taskData.subTasks.map((su) =>
    su.id === id ? { ...su, completed: !su.completed } : su
  );


  const allComplete = updatedSubTasks.every((sub) => sub.completed);
  const newTaskStatus = allComplete ? "completed" : "pending";

  const updatedTask = {
    ...taskData,
    subTasks: updatedSubTasks,
    status: newTaskStatus,
    completed: allComplete,
  };

  setTaskData(updatedTask);
  onStatusChangeInParent(updatedTask); 
  await updateTask(updatedTask);
};

  const handleSubPriority = async (value, subId) => {
    // currentSubTask.priority.find(s=>s.id===id)
    const updatedSubTasks = taskData.subTasks.map((sub) =>
      sub.id === subId ? { ...sub, priority: value } : sub,
    );
    // setCurrentSubTask((prev)=>([...prev,updatePriority]))
    const updatedTask = { ...taskData, subTasks: updatedSubTasks };
    // setCurrentSubTask(prev=>({...prev,subTasks:updatedSubTasks}))
    setTaskData(updatedTask);
    console.log("The task ahs been updated", updateTask);
    await updateTask(updatedTask);
    console.log(updatedTask);
  };

  const TotalSubTask = taskData.subTasks.length; 
  const completedSubTask=taskData.subTasks.filter(sub=>sub.completed).length
  const pendingSubTask=taskData.subTasks.filter(sub=>!sub.completed).length
  console.log(completedSubTask)
  const progressPercent=  TotalSubTask===0? 0:Math.round((completedSubTask/TotalSubTask)*100)
  const pendingPercent=(100%-progressPercent)


  const disableComplete = taskData.subTasks.some((sub) => !sub);
  return (
    <Popup onClose={()=>{setOpenDetails(null)}}>
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
            disableComplete={disableComplete}
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
             <div className="flex flex-col w-full mt-2 ">
              <label className="font-semibold mb-1">SubTasks Progress</label>
              <div className="w-full bg-gray-200 rounded-2xl h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-2xl transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {completedSubTask} / {TotalSubTask} completed ({progressPercent}%)
              </p>
               <p className="text-sm mt-1">
                {pendingSubTask} / {TotalSubTask} pending ({pendingPercent}%)
              </p>
            </div>

            <div className="flex justify-between ">
              
              <div className="flex ">
              <label className="font-semibold">SubTasks</label>
             
            
              </div>
            
              <Priority
                priority={selectedPriority}
                setPriority={setSelectedPriority}
              />
              
            </div>

            {sortedTasks().map((st, i) => (
             
               
                <div className=" flex justify-end  p-4 gap-4  w-full  ">
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={(e) => {
                      (e.stopPropagation(), handleCheckbox(st.id));
                    }}
                  />
                  <div
                    key={st.id}
                    className={`bg-white border shadow-2xl border-gray-300 rounded px-3 py-2 mt-2 w-full
                              ${st.completed ? "line-through text-gray-400" : "font-semibold"}`}
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

                          {!st.completed?( <Priority
                            priority={st.priority}
                            setPriority={(value) =>
                              handleSubPriority(value, st.id)
                            }
                          />):""}
                          
                          

                          {/* </span> */}
                        </div>

                        <span>
                          {st.remainderDate
                            ? new Date(st.remainderDate).toLocaleString()
                            : ""}
                        </span>
                        <MdOutlineModeEditOutline
                          onClick={
                            !st.completed
                              ? () => handleSubTaskEdit(st.id)
                              : undefined
                          }
                        />
                        <MdDelete onClick={() => handleSubTaskDelete(st.id)} />
                        {/* <BsThreeDotsVertical  onClick={(e)=>{ e.stopPropagation(),handledot(st.id)}}/> */}
                      </div>
                    </div>
                  </div>
                  {/* {openPriority && (
                    <div className=" mt-2 flex justify-end">
                      <Priority/>
                    </div>
                  )} */}

                  {!st.completed
                    ? !openSubTasksId === st.id && (
                        <div className="p-2 bg-gray-100 mt-1 rounded">
                          <span>
                            {st.description || "No description added"}
                          </span>
                        </div>
                      )
                    : ""}
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
          ref={taskDetailRef}
            task={taskData}
            editingSubTask={editingSubTask}
            setTaskData={setTaskData}
            setEditingSubTask={setEditingSubTask}
            currentSubTask={currentSubTask}
            setCurrentSubTask={setCurrentSubTask}
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
