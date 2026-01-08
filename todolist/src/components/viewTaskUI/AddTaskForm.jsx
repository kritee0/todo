
import React from "react";
import TaskButton from "../../pages/TaskButton"
import { RxCross2 } from "react-icons/rx";
import TaskDatePicker from "../../components/logic/TaskDatePicker"
import AddProject from "../../pages/Addproject"

const AddTaskFormUI = ({
  addTitle,
  setAddTitle,
  addDescription,
  setAddDescription,
  priority,
  setPriority,
  selectedPriority,
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
  initialData,
  remainderDate,
  setRemainderDate, 
  showRemainderDate,
  setShowRemainderDate
  
}) => {
  if (!showForm)
    return (
      <div className="flex justify-end">
        <TaskButton
          text="Add Task"
          primary
          onClick={() => setShowForm(true)}
        />
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        {initialData ? "Edit Task" : "Add Your Task"}
      </h2>

      <div className="bg-white max-w-2xl rounded-2xl shadow-2xl border-2 border-gray-200 p-4 space-y-4">
       
        <div className="flex justify-between p-4">
          <input
            type="text"
            placeholder="Task title"
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
            className="outline-none border-b-2 border-gray-200 w-full"
          />
          <RxCross2
            className="cursor-pointer"
            onClick={() => setShowForm(false)}
          />
        </div>

      
        <div className="p-4">
          <label>Description</label>
          <input
            type="text"
            value={addDescription}
            onChange={(e) => setAddDescription(e.target.value)}
            className="w-full outline-none border-b-2 border-gray-500"
          />
        </div>

        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            <TaskButton
              text={selectedProjectName || "Inbox"}
              onClick={() => setShowInbox(!showInbox)}
            />
           
 

              <TaskButton text={ date?date.toDateString():"Date"} onClick={()=>setShowDate(true)}/>
                 <TaskButton text={ remainderDate?remainderDate.toDateString():"set Remainder"}   onClick={() => setShowRemainderDate(true)} />
            <TaskButton text={selectedPriority || priority} onClick={() => setPriority("none")} />
              
          </div>

          <TaskButton
            text={initialData ? "Update Task" : "Add Task"}
            primary
            onClick={onSubmit}
          />
        </div>
        

     
        {showDate && <TaskDatePicker date={date} setDate={setDate}  close={() => setShowDate(false)} />}
        {showRemainderDate && <TaskDatePicker date={remainderDate} setDate={setRemainderDate} close={() => setShowRemainderDate(false)} />}
     
     
        

       
        {showInbox && (
          <div className="border p-3 rounded-md space-y-2">
            <AddProject onProjectSelected={onProjectSelected} />
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => onProjectSelected(proj.id, proj.name)}
              >
                {proj.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTaskFormUI;
