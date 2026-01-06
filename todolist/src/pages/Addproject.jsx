import React, { useEffect, useState } from 'react';
import { addProject, getProject ,deleteProject} from '../hook/ProjectCrud';
import { useNavigate } from 'react-router-dom';
import ProjectUI from '../components/viewTaskUI/ProjectUI.JSX';



const AddProject = ({ onProjectSelected, onProjectCreated }) => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');// project ko anme ho
  const [projects, setProjects] = useState([]);//empty array
  const [showForm, setShowForm] = useState(false);// project new create form

  const handleAddProject = async () => {
    try {
      if (!projectName.trim()) return;

      const projectResult = await addProject({
        name: projectName,
        createdAt: new Date()
      });

      if (onProjectCreated) {
        onProjectCreated(projectResult);
        console.log("project result",projectResult)
      }

      console.log("Project has been added:", projectResult);

      setProjectName('');
      setShowForm(false);

    
      const updatedProjects = await getProject();
      setProjects(updatedProjects);

    } catch (error) {
      console.log("Error on adding project:", error);
    }
  };
  const handleDelete=async(id)=>{
    try{
      await deleteProject(id)
      const updated= setProjects(prev=>(prev.filter( project=>project.id!==id)))//prev is the whole     project list, but    project is one project inside that list — filter works one project at a time.
   // if we didnot write project whole data will eb delete
    
return updated;
   
    }catch(error){
      console.log("error catching",error)

    }
     console.log("handleProjecNameis",updated)

  
  }
  const handleEdit=async(projectName)=>{
    try{

    }catch(error){
      console.log("")

    }

  }


  const handleProjectTask = (id,name) => {
    if (onProjectSelected) {
      onProjectSelected(id,name);
     // onProjectSelected(name)
      //console.log("id is",id)
     // console.log("name is",name)
      
    } else {
    navigate(`/projects/${id}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProjects = await getProject();
        console.log("fetchedproject",fetchedProjects)
        setProjects(fetchedProjects);
      } catch (error) {
        console.log("Error on fetching projects:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    <ProjectUI
    projectName={projectName}
    setProjectName={setProjectName}
    projects={projects}
    setProjects={setProjects}
    showForm={showForm}
    setShowForm={setShowForm}
    onhandleAddProject={handleAddProject}
    onhandleProjectTask ={handleProjectTask}
    onhandleEdit={handleEdit}
    onhandleDelete={handleDelete}




    />
    </>
  
  );
};

export default AddProject;
