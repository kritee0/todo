import React, { useEffect, useState } from 'react';

import ProjectUI from '../components/viewTaskUI/formView/ProjectUI.jsx';
import { useProjectHook } from '../hook/UseProjectHook.jsx';
  const AddProject = ({ onProjectSelected,onProjectCreated}) => {
    const {
    projectName,
    setProjectName,
    projects,
    showForm,
    setShowForm,
    editProjectId,  
    handleAddOrUpdate,
    handleEdit,
    handleDelete,
    handleProjectTask}
    =useProjectHook({onProjectSelected,onProjectCreated});
  return (
    <ProjectUI
      projectName={projectName}
      setProjectName={setProjectName}
      projects={projects}
      showForm={showForm}
      setShowForm={setShowForm}
      editProjectId={editProjectId}
      onhandleAddProject={handleAddOrUpdate}
      onhandleProjectTask={handleProjectTask}
      onhandleEdit={handleEdit}
      onhandleDelete={handleDelete}

    />
  );
};

export default AddProject;

