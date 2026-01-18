import React, { useEffect, useState } from 'react'
import { getProject } from '../hook/ProjectCrud'
import { getTasks } from '../hook/TaskCrud'
import TaskChart from '../components/chart/TaskChart'
import "../css/Dashboard.css"
import { GoGraph } from "react-icons/go";
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate=useNavigate();
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProject().then(data => setProjects(data))
    getTasks().then(data => setTasks(data))
  }, [])
const completedTasks = tasks.filter(t => t.status === "completed").length
const pendingTasks   = tasks.filter(t => t.status === "pending").length
const ongoingTasks   = tasks.filter(t => t.status === "ongoing").length
const abundantTasks  = tasks.filter(t => t.status === "abundant").length

const activeTasks = tasks.filter(
  t => t.status !== "completed"
).length

const totalTasks = tasks.length
const totalProjects=projects.length

  const today=new Date()
  const overDueTasks=tasks.filter(task=>{
    const taskDeadline=new Date(task.date)
   
    return taskDeadline>today && !task.completed
  
  
  })
   

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
    
      <section className=" projects-section">
      
        <div className='item-1' onClick={()=>navigate("/projects")} >
         
        <p className="stat-item">Total Projects: <span className="stat-value" >{totalProjects}</span></p>
        </div>
        {/* <div className='item-2'  >
        <p className="stat-item">Completed Projects: <span className="stat-value completed">{completedProjects}</span></p></div>
        <div className='item-3'  >
        <p className="stat-item">Active Projects: <span className="stat-value active">{activeProjects}</span></p>
        </div> */}
      </section>

      <section className="tasks-section">
      
        
      
        <div className='item-1' onClick={()=>{navigate("/view/tasks")}}>
          
        <p className="stat-item">Total Tasks: <span className="stat-value">{totalTasks}</span></p>
        </div>
        <div className='item-2' onClick={()=>{navigate("/view/tasks?filter=completed")}}>
        <p className="stat-item">Completed Tasks: <span className="stat-value completed">{completedTasks}</span></p>
        </div>
          <div className='item-3'  onClick={() => navigate("/view/tasks?filter=pending")}>
        <p className="stat-item">pendingTasks: <span className="stat-value completed">{pendingTasks}</span></p>
        </div>
          <div className='item-4' onClick={()=>{navigate("/view/tasks?filter=ongoing")}}>
        <p className="stat-item">ongoing Tasks: <span className="stat-value completed">{ongoingTasks}</span></p>
        </div>
        <div className='item-5'  onClick={()=>{navigate("/view/tasks?filter=pending")}}>
        <p className="stat-item">Active Tasks: <span className="stat-value active">{activeTasks}</span></p>
        </div>
         <div className='item-6' onClick={()=>{ navigate("/view/tasks?filter=abundantTasks")}}>
        <p className="stat-item">Abundant Tasks: <span className="stat-value active">{abundantTasks}</span></p>
        </div>
          <div className='item-7'>
        <p className="stat-item">Overdue Tasks: <span className="stat-value active">{overDueTasks}</span></p>
        </div>
      </section>
      <span className='font-bold  text-4xl items-center'> Chart</span>
     <div className='flex justify-center'>
      
      <TaskChart tasks={tasks}  className="w-full h-full"/> 
      </div>
      </div>
  
  )
}

export default Dashboard
