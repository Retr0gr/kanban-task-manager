import React from "react";
import "./task.scss";

const Task = ({ task, toggleEdit, saveTaskValue, onDragStart, deleteTask }) => {
  return (
    <div
      key={task.id}
      className="task"
      draggable
      onDragStart={(e) => onDragStart(e, task.id, task.column)}
    >
      {task.isEditing ? (
        <textarea
          className="editText"
          type="text"
          defaultValue={task.value}
          onBlur={(e) => saveTaskValue(task.id, e.target.value)}
          autoFocus
        />
      ) : (
        <span>{task.value}</span>
      )}
      <button onClick={() => toggleEdit(task.id)}>
        {task.isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default Task;
