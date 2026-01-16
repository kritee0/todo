import React from "react";
import TaskButton from "../../pages/TaskButton.jsx";
import Priority from "../logic/Priority.jsx";
import { Tally4, CircleDashed, ListCheck } from "lucide-react";
import { StepForward, ChartSpline  } from 'lucide-react';

const TaskFilter = ({ filter, setFilter, selectedPriority, setSelectedPriority }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex space-x-6">
        <TaskButton
          text="All"
          icon={<Tally4 />}
         
          onClick={() => setFilter("all")}
          primary={filter === "all"}
        />
        <TaskButton
          text="Pending"
          icon={<CircleDashed />}
          onClick={() => setFilter("pending")}
          primary={filter === "pending"}
        />
        <TaskButton
          text="Completed"
          icon={<ListCheck />}
          onClick={() => setFilter("completed")}
          primary={filter === "completed"}
        />
        <TaskButton
          text="Ongoing"
          icon={<ChartSpline/>}
          onClick={() => setFilter("ongoing")}
          primary={filter === "ongoing"}
        />
        <TaskButton
          text="Abondant"
          icon={<StepForward/> }
          onClick={() => setFilter("abondant")}
          primary={filter === "abondant"}
        />
      </div>

      <Priority
        priority={selectedPriority}
        setPriority={setSelectedPriority}
      />
    </div>
  );
};

export default TaskFilter;