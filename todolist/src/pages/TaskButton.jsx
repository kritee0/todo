import React from 'react'
import Addtask from './Addtask'

const TaskButton = ({ text, onClick, primary, className = "" }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md border border-gray-300 text-sm 
          ${primary ? "bg-blue-400 text-white hover:bg-blue-500" : "text-black hover:bg-gray-100"} 
          transition-all ${className}`}
      >
        {text}
      </button>
    </div>
  )
}

export default TaskButton