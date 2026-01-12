
import { useState } from "react";

export const usePriority = (tasks) => {

const [selectedPriority, setSelectedPriority] = useState("");


  const priorityOrder = { high: 3, medium: 2, low: 1, none: 0 };


  const sortedTasks = () => {
    if (!selectedPriority) return tasks;

    return [...tasks].sort((a, b) => {
      if (a.priority === selectedPriority) return -1;
      if (b.priority === selectedPriority) return 1;
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };


  return {
    selectedPriority,
    setSelectedPriority,
    sortedTasks,
  };
};
