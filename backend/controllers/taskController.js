const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
    const tasks = await Task.find({});
    res.status(StatusCodes.OK).json({ tasks })
};

const addTask = async (req, res) => {
    //const { value } = req.body;
    const task = await Task.create({});
    res.status(StatusCodes.CREATED).json({ task: task })
}

const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        throw new CustomError.NotFoundError(`No task with id: ${req.params.id}`);
    }
    res.status(StatusCodes.OK).json({ task });
}

const updateTaskValue = async (req, res) => {
    const { newValue } = req.body;
    const task = await Task.findOne({ _id: req.params.id });
    task.value = newValue;
    await task.save();
    res.status(StatusCodes.OK).json({ task })
}

const updateTaskColumn = async (req, res) => {
    const { column } = req.body;
    const task = await Task.findOne({ _id: req.params.id });
    task.column = column;
    await task.save();
    res.status(StatusCodes.OK).json({ task })
}

module.exports = {
    getAllTasks,
    deleteTask,
    updateTaskColumn,
    updateTaskValue,
    addTask
}