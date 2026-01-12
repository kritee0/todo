import { Outlet } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Navbar from '../../common/Navbar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Rootlayout = () => {   
  return (
    <> 
     <ToastContainer
     position='top-center'
     />
    <div className=' flex max-w-full '>   
    <Sidebar/>
    <main className='flex-2  max-w-7xl '>
      <Navbar/>
      <div className='p-8'>
    <Outlet/>
      
    </div>
    </main>
 
    </div> 
    </>
  )
}

export default Rootlayout