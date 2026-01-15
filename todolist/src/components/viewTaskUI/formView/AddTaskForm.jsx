import React from "react";
import TaskButton from "../../../pages/TaskButton";
import { RxCross2 } from "react-icons/rx";
import TaskDatePicker from "../../logic/TaskDatePicker";
import AddProject from "../../../pages/Addproject";
import Priority from "../../logic/Priority"
import { useLocation } from "react-router-dom";

const AddTaskFormUI = ({
  addTitle,
  setAddTitle,
  addDescription,
  setAddDescription,
  ref,
  priority,
  setPriority,
  date,
  setDate,
  showForm,
  setShowForm,
  showDate,
  setShowDate,
  showInbox,
  setShowInbox,
  projects,
  selectedProjectName,
  onProjectSelected,
  onSubmit,
  remainderDate,
  setRemainderDate,
  showRemainderDate,
  setShowRemainderDate,
 
}) => {
  
  const {pathname}=useLocation()
  const showAddtask = !pathname.startsWith("/view/tasks")
  if (!showForm)
    return (
      <div className={` border-gray-200 justify-end my-4 ${!showAddtask ? "hidden" : "flex"}`}>
        <TaskButton text="Add Task" primary onClick={() => setShowForm(true)} />
      </div>
    );

  return (
    <div ref={ref}  className="max-w-3xl mx-auto bg-white shadow-lg border-2 border-gray-200 rounded-2xl p-6 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
      Add your TASK
        </h2>
        <RxCross2
          className="cursor-pointer text-red-500"
          onClick={() => {
             console.log("clicked")
            setShowForm(false)
          }}
        />
      </div>

      <input
        type="text"
        placeholder="Task title"
        value={addTitle}
        onChange={(e) => setAddTitle(e.target.value)}
        className="outline-none border-b-2 border-gray-300 w-full p-2"
      />


      <textarea
        placeholder="Description"
        value={addDescription}
        onChange={(e) => setAddDescription(e.target.value)}
        className="outline-none border-b-2 border-gray-300 w-full p-2"
      /> 
      <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
        <div className="flex space-x-2 flex-wrap gap-2">
          <TaskButton
            text={selectedProjectName || "Inbox"}
            onClick={() => setShowInbox(!showInbox)}
          />
          <TaskButton
            text={date ? date.toDateString() : "Set Date"}
            onClick={() => setShowDate(true)}
          />
          <TaskButton
            text={remainderDate ? remainderDate.toDateString() : "Remainder"}
            onClick={() => setShowRemainderDate(true)}
          />
        </div>

    
        <Priority priority={priority} setPriority={setPriority} />

     
        <TaskButton text="Save Task" primary onClick={onSubmit} />
      </div>

      {showDate && (
        <TaskDatePicker date={date} setDate={setDate} close={() => setShowDate(false)} />
      )}
      {showRemainderDate && (
        <TaskDatePicker
          date={remainderDate}
          setDate={setRemainderDate}
          close={() => setShowRemainderDate(false)}
        />
      )}

   
      {showInbox && (
        <div className="border p-3 rounded-md space-y-2 mt-2">
          <AddProject onProjectSelected={onProjectSelected} />
          {projects.map((proj) => (
            <diva
              key={proj.id}
              className="cursor-pointer hover:text-blackaa"
              onClick={() => onProjectSelected(proj.id, proj.name)}
            >
              {proj.name}
            </diva>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddTaskFormUI;

