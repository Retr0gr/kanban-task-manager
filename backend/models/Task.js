const mongoose = require("mongoose");


const TaskSchema = new mongoose.Schema({
    column: {
        type: String,
        default: "Backlog"
    },
    value: {
        type: String,
        default: "New Task"
    },
    isEditing: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Task", TaskSchema);