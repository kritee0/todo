import React from "react"; 
import TaskButton from "../../../pages/TaskButton";
import { RxCross2 } from "react-icons/rx";
import TaskDatePicker from "../../logic/TaskDatePicker";
import { useProjectHook } from "../../../hook/UseProjectHook";
import Priority from "../../logic/Priority";

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
  showDate,
  setShowDate,
  showInbox,
  setShowInbox,
  selectedProjectName,
  onSubmit,
  remainderDate,
  setRemainderDate,
  showRemainderDate,
  setShowRemainderDate,
  onCancelled,
  handleProjectSelect
  // setSelectedProjectName,
  // setSelectedProjectId
}) => {
 
  const {
    projects,
    projectName,
    setProjectName,
    showForm,
    setShowForm,
    handleAddOrUpdate,
    handleProjectTask,
    onProjectSelected,
  } = useProjectHook();

  
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg border-2 border-gray-200 rounded-2xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Add your TASK</h2>
        <RxCross2 className="cursor-pointer text-red-500" onClick={onCancelled} 
        />
      </div>

      <div ref={ref}>
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
          <div className="relative flex space-x-2 flex-wrap gap-2">
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
          <TaskDatePicker
            date={date}
            setDate={setDate}
            close={() => setShowDate(false)}
          />
        )}

        {showRemainderDate && (
          <TaskDatePicker
            date={remainderDate}
            setDate={setRemainderDate}
            close={() => setShowRemainderDate(false)}
          />
        )}

        {showInbox && (
          <div className="absolute p-3 rounded-md space-y-2 mt-2 outline-none bg-white shadow-2xl w-60">
            <div className="flex justify-between">
          
            <h2 className="text-blue-950 font-semibold"> Choose Projects</h2>
              <button className="bg-gray-50" onClick={()=>setShowForm(prev=>!prev)}>+</button>
            </div>

                {showForm &&(
                  
             <div className="mt-2 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="p-2  w-full outline-none border-b-2"
                />
                    <button
                  onClick={handleAddOrUpdate}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  {projectName ? "Save" : "Add"}
                </button>
                 </div>
                )}             
             
        {projects.map((proj) => (
<div
  key={proj.id}
  className="cursor-pointer hover:text-gray-700 p-1"
 onClick={() => handleProjectSelect(proj.id, proj.name)} >
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
