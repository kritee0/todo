// import React from "react";
// import TaskButton from "../../pages/TaskButton";
// import { MdModeEdit } from "react-icons/md";
// import { MdOutlineDelete } from "react-icons/md";
// import AddProject from "../../pages/Addproject";

// const ProjectUI = ({
//   projectName,
//   setProjectName,
//   projects,
//   showForm,
//   setShowForm,
//   onhandleAddProject,
//   onhandleProjectTask,
//   onhandleEdit,
//   onhandleDelete,
// }) => {
//   return (
//     <div>
//       <div className="max-w-7xl">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-2xl font-bold text-blue-700">My Projects</h2>
//           <TaskButton
//             text={showForm ? "Cancel" : "Add Project"}
//             primary
//             onClick={() => setShowForm((prev) => !prev)}
//           />
//         </div>

//         {showForm && (
//           <div className="mb-6 p-4 rounded-lg">
//             <input
//               type="text"
//               placeholder="Enter project name..."
//               value={projectName}
//               onChange={(e) => setProjectName(e.target.value)}
//               className="w-full p-3 mb-3 outline-none border-b-2"
//             />
//             <TaskButton
//               text={editProjectId?"updateProject":"saveProject"}
//               primary
//               onClick={onhandleAddProject}
//             />
//           </div>
//         )}

//         {projects.length === 0 ? (
//           <p className="text-gray-500 italic">
//             No projects yet. Add one above!
//           </p>
//         ) : (
//           <ul className="divide-y flex flex-col divide-gray-200 rounded-lg">
//             {projects.map((proj) => (
//               <li
//                 key={proj.id}
//                 className="p-3 hover:bg-blue-50 transition-colors cursor-pointer"
//               >
//                 <span
//                   className="font-semibold text-gray-700"
//                   onClick={() => onhandleProjectTask(proj.id, proj.name)}
//                 >
//                   {proj.name}
//                 </span>
//                 <span className="ml-2 text-gray-400">{proj.date}</span>
//                 <div className="flex justify-end  space-x-4 ">
//                   <MdModeEdit
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onhandleEdit(proj);
//                     }}
//                   />
//                   <MdOutlineDelete onClick={() => onhandleDelete(proj.id)} />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProjectUI;
import React from "react";
import TaskButton from "../../../pages/TaskButton";
import { MdModeEdit, MdOutlineDelete } from "react-icons/md";

const ProjectUI = ({
  projectName,
  setProjectName,
  projects,
  showForm,
  setShowForm,
  editProjectId,
  onhandleAddProject,
  onhandleProjectTask,
  onhandleEdit,
  onhandleDelete,
}) => {
  return (
    <div className="max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-violet-500">My Projects</h2>
        <TaskButton
          text={showForm ? "Cancel" : "Add Project"}
          primary
          onClick={() => setShowForm(prev => !prev)}
        />
      </div>

      {showForm && (
        <div className="mb-6 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Enter project name..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full p-3 mb-3 outline-none border-b-2"
          />
          <TaskButton
            text={editProjectId ? "Update Project" : "Save Project"}
            primary
            onClick={onhandleAddProject}
          />
        </div>
      )}

      {projects.length === 0 ? (
        <p className="text-gray-500 italic">No projects yet. Add one above!</p>
      ) : (
       
        <ul className="divide-y flex flex-col divide-gray-200 rounded-lg">
          
          {projects.map((proj) => (
            <li
              key={proj.id}
              className="p-3 hover:bg-blue-50 transition-colors cursor-pointer"
              onClick={() => onhandleProjectTask(proj.id, proj.name)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">
                  {proj.name}
                </span>

                <div className="flex space-x-4">
                  <MdModeEdit
                    onClick={(e) => {
                      e.stopPropagation();
                      onhandleEdit(proj);
                    }}
                    className="cursor-pointer text-blue-600"
                  />

                  <MdOutlineDelete
                    onClick={(e) => {
                      e.stopPropagation();
                      onhandleDelete(proj.id);
                    }}
                    className="cursor-pointer text-red-600"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectUI;

