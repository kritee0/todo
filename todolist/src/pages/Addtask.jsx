import React, { useState, useEffect } from "react";
import AddTaskFormUI from "../components/viewTaskUI/formView/AddTaskForm";
import { addTask, updateTask } from "../hook/TaskCrud";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddTaskForm = ({ projectId, initialData, onTaskAdded, onTaskSaved, ref }) => {
  const navigate = useNavigate();

  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [priority, setPriority] = useState("");
  const [showPriority, setShowPriority] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [date, setDate] = useState(null);
  const [projects, setProjects] = useState([""]);
  const [showDate, setShowDate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [remainderDate, setRemainderDate] = useState(null);
  const [showRemainderDate, setShowRemainderDate] = useState(false);

  
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
      setAddTitle("");
      setAddDescription("");
      setPriority("");
      setSelectedProjectId("");
      setDate(new Date());
      setRemainderDate(null);
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
      if (onTaskSaved) onTaskSaved(result);
      onTaskSaved?.(taskData);//state update immediately
      toast("Task updated successfully!");
    } else {
      result = await addTask(taskData);
      if (onTaskAdded) onTaskAdded(result);
       onTaskAdded?.(taskData);
      toast("Task added successfully!");
          navigate("/view/tasks");
    }

    setShowForm(false);
    resetForm();
  };

  const handleProjectSelect = (id, name) => {
    setSelectedProjectId(id);
    setSelectedProjectName(name);
    setShowInbox(false);
  };

  return (
    <AddTaskFormUI
    ref={ref}
      addTitle={addTitle}
      setAddTitle={setAddTitle}
      addDescription={addDescription}
      setAddDescription={setAddDescription}
      priority={priority}
      setPriority={setPriority}
      showPriority={showPriority}
      setShowPriority={setShowPriority}
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
      onProjectSelected={handleProjectSelect}
      onSubmit={handleSubmit}
      initialData={initialData}
      showRemainderDate={showRemainderDate}
      setShowRemainderDate={setShowRemainderDate}
    />
  );
};

export default AddTaskForm;


