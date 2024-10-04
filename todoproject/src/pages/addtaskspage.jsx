import React, { useState, useContext } from "react";
import { TaskContext } from "./taskscontext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AddTasksPage = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [inputText, setInputText] = useState(" ");
  // const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");
  const [enableButton, setEnableButton] = useState(true);

  // useEffect(() => {
  //   const storedTasks = localStorage.getItem("tasks");
  //   if (storedTasks) {
  //     setTasks(JSON.parse(storedTasks));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  // }, [tasks]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setEnableButton(false);
  };

  const handleAddTask = () => {
    if (inputText !== "") {
      setTasks([...tasks, inputText]);
    }
    setInputText("");
    setEnableButton(true);
  };
  const handleEditTask = (index, task) => {
    setIsEditing(true);
    setEditedIndex(index);
    setEditedTask(task);
  };
  const handleSaveTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editedIndex] = editedTask;
    setTasks(updatedTasks);
    setIsEditing(false);
    setEditedIndex(null);
    setEditedTask("");
  };
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((obj) => obj !== tasks[index]);
    setTasks(updatedTasks);
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     handleAddTask();
  //   }
  // };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (isEditing) {
        handleSaveTask();
      } else {
        handleAddTask();
      }
    }
  };
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    setTasks(updatedTasks);
  };
  return (
    <div className="max-md:top-64 md:w-[calc(100vw-16rem)] w-full md:ml-[16rem] absolute top-16 py-10 pl-10">
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Add text"
        className=" p-1 border-2"
      />
      <button
        className=" bg-green-500 px-6 py-2 ml-5 rounded font-bold text-sm"
        disabled={enableButton}
        style={{ backgroundColor: enableButton ? "gray" : " " }}
        // onClick={(e) => {
        //   console.log("I am clicked!");
        // }}
        onClick={handleAddTask}
      >
        Add
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable
                  key={index}
                  draggableId={String(index)}
                  index={index}
                >
                  {(provided) => (
                    <div
                      // key={index}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex justify-between items-center mt-2  bg-gray-100 w-80 py-2 rounded"
                    >
                      {/* <div className="ml-2">{task}</div> */}
                      {/* <input type="text" value={task} className=" p-1 border-2" /> */}
                      {isEditing && editedIndex === index ? (
                        <input
                          type="text"
                          value={editedTask}
                          onChange={(e) => setEditedTask(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="p-1 border-2"
                        />
                      ) : (
                        /* <input type="text" value={task} className=" p-1 border-2" /> */
                        <div className="ml-2">{task} </div>
                      )}
                      <div>
                        {isEditing && editedIndex === index ? (
                          <button
                            className="bg-blue-500 rounded px-2 py-1 hover:bg-blue-400"
                            onClick={handleSaveTask}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="bg-yellow-500 rounded px-2 py-1 hover:bg-yellow-400"
                            onClick={() => handleEditTask(index, task)}
                          >
                            Edit
                          </button>
                        )}

                        <button
                          className=" bg-red-500 rounded px-2 py-1 ml-2 mr-2 hover:bg-red-400"
                          onClick={() => handleDeleteTask(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default AddTasksPage;
