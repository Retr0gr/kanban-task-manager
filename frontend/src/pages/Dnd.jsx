import { useState, useEffect } from "react";
import "./dnd.scss";
import Task from "../components/task/Task";
import useWebSocket from "../utilities/useWebSockets";
import { getAllTasks } from "../utilities/getAllTasks";

export default function Dnd() {
	useEffect(() => {
		// Define an async function inside the effect to call getAllTasks
		const fetchTasks = async () => {
			const fetchedTasks = await getAllTasks();
			setTasks(fetchedTasks); // Update the state with the fetched tasks
		};

		fetchTasks(); // Call the async function
	}, []); // Empty dependency array means this effect runs once on mount

	const [messages, sendMessage, clearMessages] = useWebSocket(
		"ws://localhost:8080"
	);
	const [processMessages, setProcessMessages] = useState(false);

	useEffect(() => {
		if (messages.length > 0) {
			setProcessMessages(true);
		}
	}, [messages]);

	useEffect(() => {
		if (processMessages) {
			// Process messages here
			messages.forEach((message) => {
				const jsonMessage = JSON.parse(message);
				const { action, newValue, newTask, id, column } = jsonMessage;

				switch (action) {
					case "add":
						// Assume newTask is a complete task object
						setTasks((prevTasks) => [...prevTasks, newTask]);
						break;
					case "edit":
						setTasks((prevTasks) =>
							prevTasks.map((task) =>
								task.id === id
									? { ...task, value: newValue }
									: task
							)
						);
						break;
					case "delete":
						setTasks((prevTasks) =>
							prevTasks.filter((task) => task.id !== id)
						);
						break;
					case "changeColumn":
						setTasks((prevTasks) =>
							prevTasks.map((task) =>
								task.id === id
									? { ...task, column: column }
									: task
							)
						);
						break;
					default:
						console.log("Unknown action:", action);
				}
			});
			clearMessages(); // Clear messages after processing
			setProcessMessages(false); // Reset processing flag
		}
	}, [processMessages, clearMessages]);

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
	const [tasks, setTasks] = useState([]);
	//Data about tasks id, origin, and destination
	const [dragData, setDragData] = useState({});
	// Are we hovering over the noDrop div?
	const [noDrop, setNoDrop] = useState("");

	//Add new task to tasks
	const addTask = () => {
		const newTask = {
			id: (tasks.length + 1).toString,
			column: "Backlog",
			value: `New Task`,
			isEditing: false,
		};

		const newTasks = [...tasks, newTask];
		setTasks(newTasks);
		// Prepare the task add message
		const taskAdd = { action: "add", newTask };
		// Send add message to WebSocket server
		sendMessage(taskAdd);
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
	const changeColumn = (id, column) => {
		// Map over the tasks to find the one to update
		const updatedTasks = tasks.map((task) => {
			// Check if this is the task we want to update
			if (task.id === id) {
				// If so, return a new object with the updated column
				return { ...task, column: column };
			}
			// Otherwise, return the task unchanged
			return task;
		});

		// Update the state with the modified tasks array
		setTasks(updatedTasks);

		// Prepare the task update message
		const taskChangeColumn = { action: "changeColumn", id, column };
		// Send update to WebSocket server
		sendMessage(taskChangeColumn);
	};

	// 1. setNoDrop in case item was dropped in noDrop
	// 2. gets the item id
	// 3. doesn't allow drop in noDrop
	// 4. changeCategory (see above)
	const handleDrop = (e, column) => {
		setNoDrop("");
		const selected = dragData.id;
		if (column === "noDrop") {
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
		console.log(newValue, id);
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return { ...task, value: newValue, isEditing: false };
			}
			return task;
		});
		setTasks(updatedTasks);
		// Prepare the task update message
		const taskUpdate = { action: "edit", id, newValue };
		// Send update to WebSocket server
		sendMessage(taskUpdate);
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id));
		// Prepare the task delete message
		const taskDelete = { action: "delete", id };
		// Send delete message to WebSocket server
		sendMessage(taskDelete);
	};

	return (
		<div className="container">
			<div className="topBar">
				<button onClick={() => addTask()}>Add new Task</button>
				<button onClick={() => reset()}>Reset</button>
			</div>
			<div className="columns">
				{columns.map((column) => (
					<div
						className={`${
							column === "noDrop" && noDrop === "noDrop"
								? noDrop
								: "column"
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
									<Task
										key={task.id}
										task={task}
										toggleEdit={toggleEdit}
										saveTaskValue={saveTaskValue}
										onDragStart={handleDragStart}
										deleteTask={() => deleteTask(task.id)}
									/>
								))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
