import React, { useState, useEffect } from "react";
import AddTaskFormUI from "../components/viewTaskUI/formView/AddTaskForm";
import { addTask, updateTask } from "../hook/TaskCrud";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTaskForm = ({ projectId, initialData, onTaskAdded, onTaskSaved, ref, setEditingTask }) => {
  const navigate = useNavigate();
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const [showInbox, setShowInbox] = useState(false);
  const [date, setDate] = useState(null);
  const [projects, setProjects] = useState([]);
  const [showDate, setShowDate] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [remainderDate, setRemainderDate] = useState(null);
  const [showRemainderDate, setShowRemainderDate] = useState(false);
  const [showForm, setShowForm] = useState(false);



  useEffect(() => {
    if (initialData) {
      setAddTitle(initialData.title || "");
      setAddDescription(initialData.description || "");
      setPriority(initialData.priority || "");
      setDate(initialData.date ? new Date(initialData.date) : null);
      setRemainderDate(initialData.remainderDate ? new Date(initialData.remainderDate) : null);
      setSelectedProjectId(initialData.projectId || "");
      setShowForm(true);
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setAddTitle("");
    setAddDescription("");
    setPriority("");
    setDate(null);
    setRemainderDate(null);
    setSelectedProjectId("");
    setSelectedProjectName("");
    setShowForm(false);
  };

  const handleSubmit = async () => {
    if (!addTitle.trim()) return;

    const taskData = {
      ...initialData,
      title: addTitle,
      description: addDescription,
      subTasks,
      completed: initialData ? initialData.completed : false,
      priority,
      projectId: selectedProjectId || projectId,
      date,
      remainderDate,
      remainded: false,
      createdAt: initialData ? initialData.createdAt : new Date(),
    };
    let result;
    if (initialData) {
      result = await updateTask({ ...taskData, id: initialData.id });
      onTaskSaved?.(result);
      toast("Task updated successfully!");
    } else {
      result = await addTask(taskData);
      onTaskAdded?.(result);
      toast("Task added successfully!");
      navigate("/view/tasks");
    }

    resetForm();
  };

  const handleProjectSelect = (id, name) => {
    setSelectedProjectId(id);
    setSelectedProjectName(name);
    setShowInbox(false);
  };

  // const onCancel = () => {
  //   resetForm();
  //   setShowForm(false)
  //   setEditingTask(false);
  // };
  const onCancelled=()=>{
    resetForm();
     setEditingTask(null)
     setShowForm(false);
     console.log("clg")
   
  }
  return (
    <AddTaskFormUI
      ref={ref}
      addTitle={addTitle}
      setAddTitle={setAddTitle}
      addDescription={addDescription}
      setAddDescription={setAddDescription}
      priority={priority}
      setPriority={setPriority}
      date={date}
      setDate={setDate}
      remainderDate={remainderDate}
      setRemainderDate={setRemainderDate}
      showForm={showForm}
      setShowForm={setShowForm}
      showDate={showDate}
      setShowDate={setShowDate}
      showInbox={showInbox}
      setShowInbox={setShowInbox}
      projects={projects}
      selectedProjectName={selectedProjectName}
      setSelectedProjectName={setSelectedProjectName}
      handleProjectSelect={handleProjectSelect} 
      onSubmit={handleSubmit}
      initialData={initialData}
      showRemainderDate={showRemainderDate}
      setShowRemainderDate={setShowRemainderDate}
      onCancelled={onCancelled}
      setEditingTask={setEditingTask}
    />
  );
};

export default AddTaskForm;

