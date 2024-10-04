import { createContext, useState, useEffect } from "react";

const CounterContext = createContext();

const CounterProvider = (props) => {
  const [counter, setCounter] = useState(() => {
    const storedCounter = localStorage.getItem("counter");
    return storedCounter ? parseInt(storedCounter) : 0;
  });

  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [counter]);

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };
