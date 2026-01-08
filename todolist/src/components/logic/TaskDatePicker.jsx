
import React from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const TaskDatePicker = ({ date, setDate, close  }) => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const nextWeekend = new Date();
  nextWeekend.setDate(today.getDate() + (6 - today.getDay()));

  return (
    <div className="absolute bg-white w-80 rounded-xl shadow-xl p-4 z-50">
     
      <input
        placeholder="Type a date"
        className="w-full p-2 border-b outline-none mb-2"
      />

      <div className="border-b pb-2 space-y-2">
        <p className="cursor-pointer" onClick={() => { setDate(today); close(); }}>
          📅 Today
        </p>
        <p className="cursor-pointer" onClick={() => { setDate(tomorrow); close(); }}>
         Tomorrow
        </p>
        <p className="cursor-pointer" onClick={() => { setDate(nextWeekend); close(); }}>
         Next weekend
        </p>
      </div>

      <div className="mt-3">
        <DatePicker
          onChange={(d) => { setDate(d); close(); }}
          value={date}
          calendarIcon={null}
          clearIcon={null}
        />
      </div>

      <div className="mt-3 space-y-2">
        <button className="w-full border p-2 rounded">🕒 Time</button>
 
      </div>
    </div>
  );
};

export default TaskDatePicker;
