import React from 'react'

const Model = ({message,onCancel , onConform,onClose}) => {
  return (
<>
     <div
        className=" fixed  inset-0 bg-white/50 z-40 " 
        onClick={onClose}
      />

    <div className=' fixed  inset-0 z-80 flex items-center justify-center'>
        <div className='max-w-md relative w-full h-auto bg-white  p-6 rounded-lg shadow-2xl' onClick={(e)=>e.stopPropagation()}>
           <h1 className='font-extrabold mb-4 text-center'>{message} </h1> 
           <div className='flex justify-between'>
            <button className='p-2 rounded-md bg-gray-400 cursor-pointer' onClick={onCancel}>Cancel</button>
            <button className='p-2 rounded-md text-white bg-red-800 cursor-pointer' onClick={onConform}>Conform</button>

           </div>
           

        </div>
        
      
    </div>
    </>
  )
}

export default Model
