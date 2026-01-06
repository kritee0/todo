
import React, { useState, useEffect } from "react";
import AddTaskFormUI from "../components/viewTaskUI/AddTaskForm";
import { addTask, updateTask } from "../hook/TaskCrud";

const AddTaskForm = ({ projectId, onTaskAdded, initialData }) => {
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [priority, setPriority] = useState("none");
  const [selectedPriority, setSelectedPriority] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [date, setDate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [showDate, setShowDate] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");

  useEffect(() => {
    if (initialData) {
      setAddTitle(initialData.title || "");
      setAddDescription(initialData.description || "");
      setPriority(initialData.priority || "none");
      setDate(initialData.date ? new Date(initialData.date) : new Date());
      setSelectedProjectId(initialData.projectId || "");
      setShowForm(true);
    } else {
      setAddTitle("");
      setAddDescription("");
      setPriority("none");
      setSelectedProjectId("");
      setDate(new Date());
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
      createdAt: new Date(),
    };

    let result;
    if (initialData) {
      result = await updateTask({ ...taskData, id: initialData.id });
    } else {
      result = await addTask(taskData);
    }

    if (onTaskAdded) onTaskAdded(result);
    setShowForm(false);
  };

  const handleProjectSelect = (id, name) => {
    setSelectedProjectId(id);
    setSelectedProjectName(name);
    setShowInbox(false);
  };

  return (
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
    />
  );
};

export default AddTaskForm;

