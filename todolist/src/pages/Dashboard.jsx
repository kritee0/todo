import React, { useEffect, useState } from 'react'
import { getProject } from '../hook/ProjectCrud'
import { getTasks } from '../hook/TaskCrud'
import TaskChart from '../components/chart/TaskChart'
import "../css/Dashboard.css"
import { GoGraph } from "react-icons/go";

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getProject().then(data => setProjects(data))
    getTasks().then(data => setTasks(data))
  }, [])

  const completedProjects = projects.filter(p => p.completed).length
  const activeProjects = projects.filter(p => !p.completed).length
  const totalProjects = projects.length

  const completedTasks = tasks.filter(t => t.completed).length
  const activeTasks = tasks.filter(t => !t.completed).length
  const totalTasks = tasks.length
  const today=new Date()
  const overDueTasks=tasks.filter(task=>{
    const taskDeadline=new Date(task.date)
   
    return taskDeadline>today && !task.completed
  
  
  })
   

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
    
      <section className=" projects-section">
      
        <div className='item-1'>
         
        <p className="stat-item">Total Projects: <span className="stat-value">{totalProjects}</span></p>
        </div>
        <div className='item-2'>
        <p className="stat-item">Completed Projects: <span className="stat-value completed">{completedProjects}</span></p></div>
        <div className='item-3'>
        <p className="stat-item">Active Projects: <span className="stat-value active">{activeProjects}</span></p>
        </div>
      </section>

      <section className="tasks-section">
      
        
      
        <div className='item-1'>
          
        <p className="stat-item">Total Tasks: <span className="stat-value">{totalTasks}</span></p>
        </div>
        <div className='item-2'>
        <p className="stat-item">Completed Tasks: <span className="stat-value completed">{completedTasks}</span></p>
        </div>
        <div className='item-3'>
        <p className="stat-item">Active Tasks: <span className="stat-value active">{activeTasks}</span></p>
        </div>
          <div className='item-3'>
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
