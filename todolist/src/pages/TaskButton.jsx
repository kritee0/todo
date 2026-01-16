import React from 'react'
import Addtask from './Addtask'

const TaskButton = ({ text, onClick, primary,  icon, total,className = "" }) => {
  return (
    <div>
      <button
        onClick={onClick}
     
        className={`px-4 py-2 rounded-md border border-gray-300 text-sm 
          ${primary ? "bg-blue-400 text-white hover:bg-blue-500" : " hover:bg-blue-500 hover:text-white text-black"} 
          transition-all ${className}`}
      >
        <div className='flex flex-col items-center justify-center'>
        <span>{icon}</span>
        <span>{total}</span>
        {text}
        </div>
      </button>

    </div>
  )
}

export default TaskButton