
import React, { useState, useEffect } from "react";
import AddTaskFormUI from "../components/viewTaskUI/AddTaskForm";
import { addTask, updateTask } from "../hook/TaskCrud";
import { ToastContainer, toast } from 'react-toastify';
const AddTaskForm = ({ projectId, onTaskAdded, initialData }) => {
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [priority, setPriority] = useState("none");
  const [selectedPriority, setSelectedPriority] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [date, setDate] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showDate, setShowDate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const[remainderDate,setRemainderDate]=useState()
  
  const[showRemainderDate,setShowRemainderDate]=useState(false)

  useEffect(() => {
    if (initialData) {
      setAddTitle(initialData.title || "");
      setAddDescription(initialData.description || "");
      setPriority(initialData.priority || "none");
      setDate(initialData.date ? new Date(initialData.date) : null);
      setRemainderDate(initialData.remainderDate ? new Date(initialData.remainderDate) : null);

      setSelectedProjectId(initialData.projectId || "");
      setShowForm(true);
    } else {
      setAddTitle("");
      setAddDescription("");
      setPriority("none");
      setSelectedProjectId("");
      setDate(new Date());
      setRemainderDate()
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!addTitle.trim()) return;

    const taskData = {
      title: addTitle,
      description: addDescription,
      completed: false,
      priority,
      projectId: selectedProjectId || projectId,
      date,
      remainderDate,
      remainded:false,
      createdAt: new Date(),
    };

    let result;
    if (initialData) {
      result = await updateTask({ ...taskData, id: initialData.id });
    } else {
      result = await addTask(taskData);
    }
     console.log("task is",taskData)

    if (onTaskAdded) onTaskAdded(result);
    setShowForm(false);
    toast("Task added succesfully!")
   
  };

  const handleProjectSelect = (id, name) => {
    setSelectedProjectId(id);
    setSelectedProjectName(name);
    setShowInbox(false);
  };

  return (
    <>
    
    <AddTaskFormUI
      addTitle={addTitle}
      setAddTitle={setAddTitle}
      addDescription={addDescription}
      setAddDescription={setAddDescription}
      priority={priority}
      setPriority={setPriority}
      selectedPriority={selectedPriority}
      date={date}
      setDate={setDate}
      remainderDate={remainderDate}
      setRemainderDate={setRemainderDate}
      showForm={showForm}a
      setShowForm={setShowForm}
      showDate={showDate}
      setShowDate={setShowDate}
      showInbox={showInbox}
      setShowInbox={setShowInbox}
      projects={projects}
      selectedProjectName={selectedProjectName}
      onProjectSelected={handleProjectSelect}
      onSubmit={handleSubmit}
      initialData={initialData}
      showRemainderDate={showRemainderDate}
      setShowRemainderDate={setShowRemainderDate}
      
    />
     <ToastContainer />
     </>
  );
};

export default AddTaskForm;

