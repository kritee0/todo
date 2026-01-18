import React, { useEffect, useRef, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../hook/TaskCrud";
import AddTaskForm from "./Addtask";
import { initDB } from "../database/db";
import TaskList from "../components/viewTaskUI/taskUi/TaskList";
import Model from "../common/model";
import { useLocation } from "react-router-dom";

const ViewTasks = () => {
  const ref=useRef(null)
  const location =useLocation();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const[showConform,setShowConform]=useState(false)
  const[taskDelete,setTaskDelete]=useState(null)

  useEffect(()=>{
    const params= new URLSearchParams(location.search)
    const urlFilter= params.get("filter")||"pending"
    setFilter(urlFilter)

  },[location.search])

  useEffect(() => {
      console.log(ref.current)

    if(ref?.current){
      console.log(ref.current)
      
      ref.current.scrollIntoView({ 
        block: "start"
      })
    }
  }, [editingTask])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await initDB();
        const allTasks = await getTasks();
        setTasks(allTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchData();
  }, []);


  const handleToggle = async (task) => {
   const completed = !task.completed;
  const status = completed ? "completed" : task.status; 

  const updatedTask = { ...task, completed, status };

  await updateTask(updatedTask);
    await updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updatedTask : t))
    );
  };


  const onrequestDelete=(task)=>{
    setTaskDelete(task)
    setShowConform(true)

  }

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

 
  const handleEditSave = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
  };

const handleStatusChangeInParent = (updatedTask) => {
  setTasks(prev =>
    prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
  )
}





  return (
    <>
      
      <TaskList
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        onToggle={handleToggle}
        onrequestDelete={onrequestDelete}
        onEdit={setEditingTask}
        editingTask={editingTask}
       onStatusChangeInParent={handleStatusChangeInParent}

      />
{showConform &&  taskDelete &&(
  <Model
   message={`Are you sure you want to delete "${taskDelete.title}"?`}
   onConform={async()=>{
     await handleDelete(taskDelete.id)
     setShowConform(false)
     setTaskDelete(null)
     console.log(setShowConform)


   }}
   onCancel={()=>{
    setShowConform(false)
    setTaskDelete(null)


   }}>
    

  </Model>

)}
  
      {editingTask && (
        <AddTaskForm
          ref={ref}
          key={editingTask.id} 
          initialData={editingTask}
          onTaskSaved={handleEditSave}
        />
      )}
    </>
  );
};

export default ViewTasks;
