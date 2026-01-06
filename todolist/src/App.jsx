import React, { useEffect,useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route, 
} from "react-router-dom";

import Rootlayout from "./components/layout/Rootlayout";
import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/Addproject";
import TaskPage from "./pages/Taskpages"; 
import AddTaskForm from "./pages/Addtask"; 
import ViewTasks from "./pages/ViewTasks"; 
import { initDB } from "./database/db";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Rootlayout />}>
      <Route path="dashboard" element={<Dashboard />} />

    
      <Route path="projects" element={<AddProject />} />
      <Route path="projects/:projectId" element={<TaskPage />} />

    
      <Route path="view/tasks" element={<ViewTasks />} />
      <Route path="/tasks/new" element={<AddTaskForm />} />
    </Route>
  )
);

const App = () => {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDB()
      .then(() =>
        console.log("database is initialized"),
        setDbReady(true))
      
      .catch((err) => console.log("DB init error:", err));
  }, []); 
 if (!dbReady) {
    return <div>Loading database...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;

