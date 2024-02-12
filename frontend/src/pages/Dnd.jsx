import { useState } from "react";
import "./dnd.scss";

export default function Dnd() {
  // 3 Columns for the tasks to be dragged between
  const columns = ["Backlog", "In Progress", "Completed"];

  //Some Initial tasks
  const initialTasks = [
    { id: 1, column: "Backlog", value: "task1", isEditing: false },
    { id: 2, column: "Backlog", value: "task2", isEditing: false },
    { id: 3, column: "Backlog", value: "task3", isEditing: false },
  ];

  //Sets the state of the tasks
  //Can be used to add tasks
  const [tasks, setTasks] = useState(initialTasks);
  //Data about tasks id, origin, and destination
  const [dragData, setDragData] = useState({});
  // Are we hovering over the noDrop div?
  const [noDrop, setNoDrop] = useState("");

  //Add new task to tasks
  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      column: "Backlog",
      value: `task ${tasks.length + 1}`,
      isEditing: false,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const reset = () => {
    setTasks(initialTasks);
  };

  //onDragStart we setDragData
  //usestate instead of e.dataTransfer se we can transfer more data
  const handleDragStart = (e, id, column) => {
    setDragData({ id: id, initialColumn: column });
  };

  // If we enter the noDrop zone the state will be updated
  // Used for styling.
  const handleDragEnter = (e, column) => {
    if (column === "noDrop") {
      setNoDrop("noDrop");
    }
  };

  // DND will not work without this.
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // setNoDrop to nothing to return styling to normal
  const handleDragLeave = (e) => {
    setNoDrop("");
  };

  //1. makes copy of taks (newTasks)
  //2. changes category of the task to its new column
  //3. setTask to our NewTasks
  const changeColumn = (taskId, column) => {
    const newTasks = [...tasks];
    newTasks[taskId - 1].column = column;
    setTasks([...newTasks]);
  };

  // 1. setNoDrop in case item was dropped in noDrop
  // 2. gets the item id
  // 3. doesn't allow drop in noDrop
  // 4. changeCategory (see above)
  const handleDrop = (e, column) => {
    setNoDrop("");
    const selected = dragData.id;
    if (column === "noDrop") {
      console.log("nuh uh");
    } else {
      changeColumn(selected, column);
    }
  };

  const toggleEdit = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isEditing: !task.isEditing };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const saveTaskValue = (id, newValue) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, value: newValue, isEditing: false };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div>
        <button onClick={() => addTask()}>Add new Task</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
      <div className="columns">
        {columns.map((column) => (
          <div
            className={`${
              column === "noDrop" && noDrop === "noDrop" ? noDrop : "column"
            }`}
            onDragEnter={(e) => handleDragEnter(e, column)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column)}
            key={column}
          >
            <h1 className="title">{column}</h1>
            <div>
              {tasks
                .filter((task) => task.column === column)
                .map((task) => (
                  <div
                    key={task.id}
                    className={`${
                      column === "noDrop" && noDrop === "noDrop"
                        ? "notAllowed"
                        : "task"
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id, column)}
                  >
                    {task.isEditing ? (
                      <input
                        type="text"
                        defaultValue={task.value}
                        onBlur={(e) => saveTaskValue(task.id, e.target.value)}
                        autoFocus
                      />
                    ) : (
                      task.value
                    )}
                    <button className="editButton" onClick={() => toggleEdit(task.id)}>
                      {task.isEditing ? "Save" : "Edit"}
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

//onDragStart={(e) => handleDragStart(e, task.id, column)}
