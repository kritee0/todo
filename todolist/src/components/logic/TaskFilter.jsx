import React from "react";
import TaskButton from "../../pages/TaskButton.jsx";
import Priority from "../logic/Priority.jsx";
import { Tally4, CircleDashed, ListCheck } from "lucide-react";
import { StepForward, ChartSpline  } from 'lucide-react';

const TaskFilter = ({tasks, filter, setFilter, selectedPriority, setSelectedPriority }) => {
  const allCount=tasks.filter(t=>!t.completed).length
  // const All =tasks.filter(t=>t.status==="all").length
  const pendingCount =tasks.filter(t=>t.status==="pending").length
  
  const completedCount =tasks.filter(t=>t.status==="completed").length
  const ongoingCount=tasks.filter(t=>t.status==="ongoing").length
   const AbondantCount=tasks.filter(t=>t.status==="abundant").length

 return (
    <div className="flex justify-between ">
      <div className="flex space-x-6">
        <TaskButton
          text="All"
          icon={<Tally4 />}
          count={allCount}
          onClick={() => setFilter("all")}
          primary={filter === "all"}
        />
        <TaskButton
          text="Pending"
          icon={<CircleDashed />}
          count={pendingCount}
          onClick={() => setFilter("pending")}
          primary={filter === "pending"}
        />
        <TaskButton
          text="Completed"
          icon={<ListCheck />}
          count={completedCount}
          onClick={() => setFilter("completed")}
          primary={filter === "completed"}
        />
        <TaskButton
          text="Ongoing"
          icon={<ChartSpline/>}
          count={ongoingCount}
          onClick={() => setFilter("ongoing")}
          primary={filter === "ongoing"}
        />
        <TaskButton
          text="  Abundant"
        
          icon={<StepForward/> }
            count={AbondantCount}
          onClick={() => setFilter("abundant")}
          primary={filter === "abundant"}
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