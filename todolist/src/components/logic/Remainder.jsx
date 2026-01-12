import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { updateTask } from "../../hook/TaskCrud";

const Remainder = ({ tasks }) => {
  function showNotification(message) {
    toast.info(message);
  }

  async function markAsReminded(task) {
    await updateTask({ ...task, reminded: true });
  }

  async function checkReminders() {
    const now = new Date();

    for (const task of tasks.filter(t => t.remainderDate && !t.reminded)) {
      const reminderTime = new Date(task.remainderDate);
      const dueTime = task.date ? new Date(task.date) : null;

      if (reminderTime <= now) {
        showNotification(`Reminder: "${task.title}"`);
        await markAsReminded(task);
      }

      if (dueTime) {
        const diffDays = Math.ceil((dueTime - now) / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          showNotification(`Task "${task.title}" is due in ${diffDays} day(s)!`);
        } else if (diffDays === 0) {
          showNotification(`Task "${task.title}" is due today!`);
        } else {
          showNotification(`Task "${task.title}" is overdue!`);
        }
      }
    }
  }

  useEffect(() => {
    checkReminders();
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [tasks]);
  console.log(checkReminders)

  return null;
};

export default Remainder;

