import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import TaskList from "../components/viewTaskUI/taskUi/TaskList";
import AddTaskForm from "./Addtask";
import Model from "../common/model";
import { useTasksHook } from "../hook/useTaskHook"

const Taskpages = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

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
  } = useTasksHook(projectId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-gray-600 hover:text-violet-500 cursor-pointer mb-4"
      >
    
        <h2 className="text-xl font-semibold text-blue-950">
         {/* {project?.name} */}
        </h2>
      </div>

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
    </div>
  );
};

export default Taskpages;