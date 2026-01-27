import React ,{useEffect}from "react";
import TaskList from "../components/viewTaskUI/taskUi/TaskList";
import AddTaskForm from "./Addtask";
import Model from "../common/model";
import { useTasksHook } from "../hook/useTaskHook"
const ViewTasks = () => {
  const {
    ref,
    tasks,
    filter,
    setFilter,
    editingTask,
    setEditingTask,
    showConfirm,
    taskDelete,
    handleToggle,
    requestDelete,
    handleDelete,
    handleEditSave,
    handleStatusChangeInParent,
  } = useTasksHook();
   useEffect(()=>{
    console.log(editingTask)
    
  
  },[editingTask])
  return (
    <>
      <TaskList
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        onToggle={handleToggle}
        onrequestDelete={requestDelete}
        onEdit={setEditingTask}
        editingTask={editingTask}
        onStatusChangeInParent={handleStatusChangeInParent}
      />
      {showConfirm && taskDelete && (
        <Model
          message={`Are you sure you want to delete "${taskDelete.title}"?`}
          onConform={() => handleDelete(taskDelete.id)}
        onCancel={() => setEditingTask(null)}
        />
      )}

      {editingTask && (
        <AddTaskForm
          ref={ref}
          key={editingTask.id}
          initialData={editingTask}
          setEditingTask={setEditingTask}
          onTaskSaved={handleEditSave}
          onCancelled={() => setEditingTask(null)}
        />
      )}
    </>
  );
};

export default ViewTasks;

