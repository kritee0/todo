import React, { useState } from 'react';

const Priority = ({ tasks, setTask }) => {
  const [selectedPriority, setSelectedPriority] = useState("none");

  const priorityOrder = { high: 3, medium: 2, low: 1, none: 0 };

 
  function sortByPriority(tasks) {
    return [...tasks].sort((a, b) => {
      const aPriority = priorityOrder[a.priority] || 0;
      const bPriority = priorityOrder[b.priority] || 0;
      return bPriority - aPriority;
    });
  }


  function handleSort() {
    const sortedTasks = sortByPriority(tasks);
    setTask(sortedTasks);
  }
  return (
    <>
      <div>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="border p-2 rpi"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
          <option value="none">None</option>
        </select>

        <button onClick={handleSort} className="ml-2 p-2 border">
          Sort
        </button>
      </div>
    </>
  );
};

export default Priority;