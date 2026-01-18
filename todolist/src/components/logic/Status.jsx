import React, { useState } from "react";
import { useEffect } from "react";
import { RiFilter3Line } from "react-icons/ri";

const Status = ({ openStatus, setOpenStatus,onStatusChange,currentStatus }) => {
  const [status, setStatus] = useState(currentStatus|| "pending");
  const handleSelect = (value) => {
    setStatus(value);
    setOpenStatus(false);
    onStatusChange(value);
   
  };
  useEffect(()=>{
    setStatus(currentStatus)

  },[currentStatus])
  return (
    <>
      <div className=" max-w-xs h-auto z-10   bg-blue-950 px-2 border-2 border-gray-400 cursor-pointer  text-white  rounded-xl  mb-2 border-b-2 border-b-white">
        <div
          className=" relative text-bold text-lg flex  text-white items-center justify-center"
          onClick={() => setOpenStatus((prev) => !prev)}
        >
          <RiFilter3Line />
          <span className="ml-2">{status || "Status"}</span>

          {/* <span  className="text-bold text-xl text-white" onClick={()=>setOpenStatus(prev=>!prev)}>status</span> */}

          {openStatus && (
            <div className=" absolute -right-2 top-full border-2 border-gray-300  bg-white space-y-1  text-black rounded-md p-2">
              <ol>
                <li
                  className="  hover:bg-black/20 "
                  onClick={() => handleSelect("pending")}
                
                >
                  Pending
                </li>
                <li
                  className=" hover:bg-black/20"
                  onClick={() => handleSelect("completed")}
                >
                  Completed
                </li>
                <li
                  className=" hover:bg-black/20"
                  onClick={() => handleSelect("ongoing")}
                >
                  Ongoing
                </li>
                <li
                  className=" hover:bg-black/20"
                  onClick={() => handleSelect("abundant")}
                >
                  Abundant
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Status;


  /* <select  value={status} onChange={()=>{setStatus(e.target.value)}} className='px-1 py-2  rounded-md  text-sm outline-none bg-black'> 
            <option>pending</option>
            <option>Completed</option>
            <option>onGoing</option>
             <option>Abondant</option>
            </select> */

