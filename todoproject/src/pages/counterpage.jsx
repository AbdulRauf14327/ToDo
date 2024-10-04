import React, { useState, useContext } from "react";
import { CounterContext } from "./countercontext";

const CounterPage = () => {
  // const [counter, setCounter] = useState(0);
  const { counter, setCounter } = useContext(CounterContext);

  const handleReset = () => {
    setCounter(0);
  };
  const handleClick1 = () => {
    setCounter(counter + 1);
  };

  const handleClick2 = () => {
    setCounter(Math.max(0, counter - 1));
  };
  const handleClick3 = () => {
    setCounter(counter + 4);
  };
  const handleClick4 = () => {
    setCounter(Math.max(0, counter - 4));
  };

  return (
    <div className="max-md:top-30 md:w-[calc(100vw-16rem)] w-full md:ml-[16rem] absolute top-16 py-10 pl-10">
      <div className="main flex gap-5 max-md:flex-col">
        <div>
          <button
            className=" bg-red-500 px-4 py-1 rounded font-bold"
            onClick={handleClick4}
          >
            -4
          </button>
        </div>
        <div>
          <button
            className=" bg-red-400 px-4 py-1 rounded font-bold"
            onClick={handleClick2}
          >
            -1
          </button>
        </div>
        <div className=" bg-slate-300 w-32 rounded font-bold flex justify-center items-center">
          {counter}
        </div>
        <div>
          <button
            className=" bg-green-400 px-4 py-1 rounded font-bold"
            onClick={handleClick1}
          >
            +1
          </button>
        </div>
        <div>
          <button
            className=" bg-green-500 px-4 py-1 rounded font-bold"
            onClick={handleClick3}
          >
            +4
          </button>
        </div>

        <div>
          <button
            className=" bg-gray-500 px-4 py-1 rounded font-bold"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CounterPage;
