import React, { useState } from "react";
import "./task.scss";

const Task = ({ task, toggleEdit, saveTaskValue, onDragStart, deleteTask }) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleTaskClick = () => {
		setIsSelected(!isSelected);
	};

	return (
		<div
			key={task.id}
			className="task"
			draggable
			onDragStart={(e) => onDragStart(e, task.id, task.column)}
			onClick={handleTaskClick}
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
			{isSelected && (
				<>
					<button
						onClick={(e) => {
							e.stopPropagation();
							toggleEdit(task.id);
						}}
					>
						{task.isEditing ? "Save" : "Edit"}
					</button>
					<button
						onClick={(e) => {
							e.stopPropagation();
							deleteTask(task.id);
						}}
					>
						Delete
					</button>
				</>
			)}
		</div>
	);
};

export default Task;
