import { createContext, useState, useEffect } from "react";

const TaskContext = createContext();

const TaskProvider = (props) => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {props.children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
