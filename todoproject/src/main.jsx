import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { TaskProvider } from "./pages/taskscontext.jsx";
import { CounterProvider } from "./pages/countercontext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <BrowserRouter>
  //   <App />
  // </BrowserRouter>

  <BrowserRouter>
    <TaskProvider>
      <CounterProvider>
        <App />
      </CounterProvider>
    </TaskProvider>
  </BrowserRouter>
);
