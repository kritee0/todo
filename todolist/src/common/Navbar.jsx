import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { IoNotificationsOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className='max-w-7xl  mx-auto ' >
        <nav className='w-full h-[44px] sticky inset-0 z-50 bg-blue-200  shadow-md   flex-wrap shrink-0  '>

          <div className=' px-8 flex  h-full items-center space-x-4   justify-end   '>
               <IoNotificationsOutline size={24} />
          <RxHamburgerMenu  size={24}/>
       
          </div>
          
            
        </nav>
      
    </div>
  ) 
}

export default Navbar
