const express = require("express");
const router = express.Router();
const { getAllTasks, deleteTask, updateTaskValue, updateTaskColumn, addTask } = require("../controllers/taskController");

router
    .route("/")
    .get(getAllTasks);

router
    .route("/addTask")
    .post(addTask);

router
    .route("/deleteTask/:id")
    .delete(deleteTask);

router
    .route("/updateColumn/:id")
    .patch(updateTaskColumn);

router
    .route("/updateValue/:id")
    .patch(updateTaskValue);

module.exports = router;