import React from 'react'
import Addtask from './Addtask'

const TaskButton = ({text,onClick,primary,className=""}) => {
  return (
    <div>
        <button  onClick={onClick}  className={` px-4 py-2 rounded-md  border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition-all ${ primary ?"bg-blue-400 hover:bg-blue-100":" text-gray-700 hover:bg-gray-100"} ${className}`}> 
        {text}
        </button>
      
    </div>
  )
}

export default TaskButton
