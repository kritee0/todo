
import React from "react";

const Priority = ({ priority, setPriority }) => {
  return (
    <select
      value={priority}
      onClick={(e)=>{e.stopPropagation()}}
      onChange={(e) => {setPriority(e.target.value)}}
      className="px-1 py-2  rounded-md border border-gray-300 text-sm outline-none self-center-safe"
    >
      <option value=""   className="outline-none">select priority</option>
      <option value="high" className="outline-none ">High</option>
      <option value="medium" className="outline-none" >Medium</option>
      <option value="low" className="outline-none">Low</option>
    
    </select>
  );
};

export default Priority;
