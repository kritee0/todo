import React, { useState } from "react";
import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import TaskButton from "../../../pages/TaskButton";
import { useProjectHook } from "../../../hook/useProjectHook";
import Model from "../../../common/model";
import { useNavigate } from "react-router-dom"; 

const ProjectUI = () => {
  const {
    projects,
    projectName,
    setProjectName,
    showForm,
    setShowForm,
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
  } = useProjectHook();

  const navigate = useNavigate();  

  const [showDelete, setShowDelete] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);

  const requestDelete = (project) => {
    setProjectToDelete(project);
    setShowDelete(true);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">My Projects</h2>
        <TaskButton
          text={showForm ? "Cancel" : "Add Project"}
          onClick={() => setShowForm((prev) => !prev)}
          primary
        />
      </div>

      {showForm && (
        <div className="mb-4">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border-b w-full p-2"
            placeholder="Project name"
          />
          <TaskButton text="Save" onClick={handleAddOrUpdate} primary />
        </div>
      )}

      {projects.map((proj) => (
        <div
          key={proj.id}
          className="flex justify-between p-2 hover:bg-gray-100 cursor-pointer"
         onClick={() => navigate(`/projects/${proj.id}`)}
        >
          <span>{proj.name}</span>

          <div className="flex gap-3">
            <MdModeEdit
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(proj);
              }}
            />
            <MdOutlineDelete
              onClick={(e) => {
                e.stopPropagation();
                requestDelete(proj);
              }}
            />
          </div>
        </div>
      ))}

      {showDelete && (
        <Model
          message={`Are you sure you want to delete "${projectToDelete.name}"?`}
          onConform={() => {
            handleDelete(projectToDelete.id);
            setShowDelete(false);
          }}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {showEdit && (
        <Model
          message={`Are you sure you want to update "${projectToEdit.name}"?`}
          onConfirm={() => {
            handleEdit(projectToEdit.id);
            setShowEdit(false);
          }}
          onCancel={() => setShowEdit(false)}
        />
      )}
    </div>
  );
};

export default ProjectUI;

      {/* {tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          // onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={setEditingTask}
        />
      ) : (
        <p className="text-gray-500 text-center">
          No tasks added for this project.
        </p>
      )} */}
