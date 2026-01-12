
import React from "react";

const Priority = ({ priority, setPriority }) => {
  return (
    <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="px-3 py-2  rounded-md border border-gray-300 text-sm"
    >
      <option value="">Select Priority</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    
    </select>
  );
};

export default Priority;
